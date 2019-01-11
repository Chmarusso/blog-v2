---
title: Basic GDPR data takeout from Rails application
date: 2018-06-10 13:17:00
tags:
- ruby on rails
- rails
- ruby
intro: Ruby class for export any of your user personal data to the ZIP archive.
cover: ./gdpr-rails-applicaton.jpg
---
General Data Protection Regulation (GDPR) is a public regulation in EU law on data protection. I do not want to go too much into the details of it, because I am not a lawyer, but as you might know, the regulation obligates data processor/controller to provide access (upon request) to personal data that you are processing. That means that each user of your Rails application may ask you anytime for access to her/his data and you need to provide it within 14 days. As an owner of a website I already received such requests, so I decided to write some Ruby class that will help me save some time.

### What do I want to automate?
1. Generate CSV files with personal user data that my app is currently processing
2. Prepare directory for these CSV files
3. Compress generated folder and secure it with a random password

### Exporting data to CSV files
In my app, I want to export: user profile, comments, poll votes and personal messages sent to other users. For each of these resources, I have a separate model, so I decided to implement a class that will generate CSV file for any model collection that I provide as an argument:
```ruby
require 'csv'

module GDPR
  class ExportRecords
    class << self
      def call(path, records, exclude_columns)
        return if records.empty?

        filename = generate_filename(path, records.first)
        columns = get_column_names(records.first, exclude_columns)

        CSV.open(filename, 'w', write_headers: true, headers: columns) do |csv|
          records.find_each do |record|
            csv << columns.map {|c| record.read_attribute(c)}
          end
        end
      end

      private

      def generate_filename(path, record)
        File.join(path, "#{record.class.table_name}.csv")
      end

      def get_column_names(record, exclude_columns)
        column_names = record.class.column_names
        exclude_columns.each do |col|
          column_names.delete(col)
        end
        column_names
      end
    end
  end
end
```

If I want to export comments, I can invoke it in the following way:
```ruby
GDPR::ExportRecords('/path/to/dir/with/takeouts',
                    Comment.where(user_id: takeout_requester_id),
                    [])
```
Above call will produce `/path/to/dir/with/takeouts/comments.csv` file that contains the dump of all comments created by given user. Then I can use the same class for exporting data from the different model. The third parameter (array) allows me to specify fields that I do not want to include in the dump for some reason:
```ruby
GDPR::ExportRecords('/path/to/dir/with/takeouts',
                    Message.where(user_id: takeout_requester_id),
                    ['secret_token', 'other_user_data'])
```
As we have the class that exports the data for us now, it is time for compressing the whole directory into a ZIP file.

### Compressing takeout
In Ruby, there are plenty ways of compressing directories, but I decided to use system command `zip`:
```ruby
  def archive_directory(takeout_path)
    password = SecureRandom.urlsafe_base64(12)
    archive_name = "#{File.basename(takeout_path)}.zip"
    archive_path = File.join(TAKEOUTS_PATH, archive_name)
    system("zip --password #{password} -j -r9 #{archive_path} #{takeout_path}")

    [archive_path, password]
  end
```

Below some explanation of `zip` command (make sure you have it installed in your OS):
```
zip --password #{password} -j -r9 #{archive_path} #{takeout_path}

Options explained:
---password secures archive with given password
-j junk (don't record) directory names (we do not want archive to have all parent directories)
-r recurse into directories
-9 better compression
```

### Whats next?
Once we have compressed archive, we can deliver it to the individual that requested it. It can be done in many ways, depending on your app (password protected section, system notification or just e-mail with the download URL), so I won't cover it in this article. Final Ruby class may look like this and can be invoked by any Ruby on Rails model, controller or service object class in your application (consider running it in the background job!):
```ruby
require 'securerandom'

module GDPR
  class PerformTakeout
    class << self
      TAKEOUTS_PATH = File.join(Rails.root, 'public', 'system', 'takeouts')

      def call(user_id)
        user = User.find(user_id)
        path = prepare_directory(user_id)
        export_records(path, user_id)
        archive_directory(path)
      end

      private

      def prepare_directory(user_id)
        GDPR::PrepareDir.call(user_id)
      end

      def export_records(path, user_id)
        GDPR::ExportRecords.call(path, User.where(id: user_id), [])
        GDPR::ExportRecords.call(path, Comment.where(user_id: user_id), [])
        GDPR::ExportRecords.call(path, Vote.where(user_id: user_id), [])
      end

      def archive_directory(takeout_path)
        password = SecureRandom.urlsafe_base64(12)
        archive_name = "#{File.basename(takeout_path)}.zip"
        archive_path = File.join(TAKEOUTS_PATH, archive_name)
        system("zip --password #{password} -j -r9 #{archive_path} #{takeout_path}")

        [archive_path, password]
      end
    end
  end
end
```
The full code I just published on [my GitHub](https://github.com/Chmarusso/ruby-gdpr-takeout).
