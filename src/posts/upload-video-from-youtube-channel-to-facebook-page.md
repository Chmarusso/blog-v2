---
title: Upload video from YouTube channel to Facebook Page
date: 2017-03-07 20:24:47
tags:
- dajsiepoznac2017
- getnoticed
- Ruby
- facebook
- youtube
intro: Easy solution for automatic Facebook video uploads in Ruby.
cover: /images/upload-facebook.jpg
---
I am owner of YouTube channel and Facebook Page. One day I caught up myself that I’m uploading same file to YouTube and Facebook. I don’t like to waste my time, so I decided to automate this task. I know that it is possible to upload file just to YouTube and then simply share link to it on FB, but it wasn’t my goal - wanted video to be uploaded straight into Facebook Video library. Enough talking, let’s start coding.

### What we need to do?
1. Find download URL for given YouTube video
2. Download video from YouTube
3. Upload video to Facebook Page.

### Get YouTube download link
YouTube offers special URL where we can obtain some info about the video. Then we need to parse the output and get the URL which we gonna need later.
``` ruby
module Youtube
  class GetUrl

    def self.call(vid)
      new.call(vid)
    end

    def call(vid)
      raw_data = open(info_url(vid)) { |f| f.read }
      parsed_info = parse(raw_data)
      parsed_stream_map = parse(parsed_info['url_encoded_fmt_stream_map'][0])
      parsed_stream_map['url'][0]
    end

    private

    def info_url(vid)
      "http://www.youtube.com/get_video_info?video_id=#{vid}"
    end

    def parse(data)
      CGI.parse data
    end
  end
end
```
Then we can call our simple class and get the download URL:

    Youtube::GetUrl.call('_FAqlDUMgf0')

URL we received from YT is temporarily available and it might be used only from IP that actually asked for it.

### Upload file to Facebook Page

I don't want to write upload logic completely from scratch, so I decided to use [(koala gem)](https://github.com/arsduo/koala), which really helps in dealing with Facebook Graph API.  
``` ruby
module Facebook
  class AddYtVideo
    def self.call(video_id, title, description, fb_page_id, token)
      new.call(video_id, title, description, fb_page_id, token)
    end

    def call(video_id, title, description, fb_page_id, token)
      yt_download_url = get_url(video_id)
      tmp_file = download(yt_download_url)
      put_video!(title, description, fb_page_id, token)
      remove_tmp_file!(tmp_file)
    end

    private

    def get_url(video_id)
      Youtube::GetUrl.call(video_id)
    end

    def download(url)
      path = tmp_file_path
      File.open(path, "w") do |f|
        IO.copy_stream(open(url), f)
      end
      path
    end

    def put_video!(title, description, fb_page_id, token)
      api = api_client(token)
      video_type = 'video/mp4'
      video_info = { title: title, description: description }
      api.put_video(path, 'video/mp4', video_info, fb_page_id)
    end

    def tmp_file_path
      "/tmp/ytvideo" + SecureRandom.hex[0..4] + ".mp4"
    end

    def api_client(token)
      Koala::Facebook::API.new(token)
    end

    def remove_tmp_file(path)
      File.delete(path)
    end
  end
end
```
Now we can call this class and get our video uploaded:

    Facebook::AddYtVideo.call('_FAqlDUMgf0', 'React Native', 'Nice video', 'FACEBOOK_PAGE_TOKEN')

If you want to try this code with you Facebook page first you need to setup FB APP and obtain token. For quick start I recommend to use Graph API Explorer which is available here: https://developers.facebook.com/tools-and-support/
