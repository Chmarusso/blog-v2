---
title: Git - Take care of your branches
date: 2017-07-01 18:52:46
tags:
- git
intro: Keeping git log in a good shape is not easy. Feature branches may become little messy, but I've got few tips for you.
cover: /images/git-branches.jpg
---
Commit messages are not only you - they are mainly for your colleagues and anyone who will work with your code in the future. That is the reason why we all should care about what we are communicating in each single message. After some period of time "bug fix" or "new feature" means nothing, so make sure that your commits are clear and they are actually telling the truth about changes that you committed. Keeping git log in a good shape is not an easy task, especially when you are trying to fix some nasty bug overnight. Git was made for programmers, so it has some built-in tools that are really helpful when it comes to managing your feature branch log. In this article, I will try to present you some common situations when our feature branches may become little messy and how to avoid them.

## Forgotten files
You created a template for an e-mail message, but you have forgotten to commit some asset.  Currently, your git log looks like this:
```
017dc1d Email template for order confirmation.
3968fa3 Add a missing attribute to Order.
```

Your most recent commit is 017dc1d and you want to add to it missing asset. Git newbie probably would add the missing asset in the separate commit.  That is not the best solution, as the log from now on is polluted with unwanted commit:
```
dccef37 Add missing asset to email template
017dc1d Email template for order confirmation.
3968fa3 Add a missing attribute to Order.
```
In such situations, we can commit forgotten file with `--amend` flag:
```
git add assets/footer-email-bg.png
git commit --amend --no-edit
```
At above example, git will "add" forgotten asset to our most recent commit, so our log will still look like this:
```
017dc1d Email template for order confirmation.
3968fa3 Add a missing attribute to Order.
```
Sometimes when amending forgotten files/changes editing message is necessary. Git will let you do it if you use amend without `--no-edit` flag.

## Many commits that are touching same subject
Your client asks you for a small change in the web page header. She wants you to reduce the font size of the header. You changed it:
```
4d86f38 Header font size reduced.
11d47da Fix missing body open tag
37cbb8a Increment bower version
```

Client checked the new version of the header but this time did not like opacity applied on menu buttons. After next change the log looks like this:
```
21e1633 Greater opacity on primary buttons
4d86f38 Header font size reduced.
11d47da Fix missing body open tag
37cbb8a Increment bower version
```
Now, footer looks fine, but spacing is too small on mobile phones. One more commit and the log finally looks like this:
```
97becdb Increase spacing between button
21e1633 Greater opacity on primary buttons
4d86f38 Header font size reduced.
11d47da Fix missing body open tag
37cbb8a Increment bower version
```
Do we really need three separate commits for tiny and quick changes applied to web page header? Does it bring any value for the future development? I don't think so. We can squash those three entries into one elegant commit with a relevant message.

In order to do squash, we need to enter interactive rebase mode for our last 3 commits:
```
git rebase -i HEAD~3
```

Now git should open a file in your default editor:
```
pick 97becdb Increase spacing between button
pick 21e1633 Greater opacity on primary buttons
pick 4d86f38 Header font size reduced.
```
Mark two commits for squash:
```
pick 97becdb Increase spacing between button
squash 21e1633 Greater opacity on primary buttons
squash 4d86f38 Header font size reduced.
```
Save the file, edit commit message in the next step and examine how log looks after the rebasing.
Our branch from now on should have the following log:
```
4daa0c7 Change font size, opacity and spacing for menu buttons.
11d47da Fix missing body open tag
37cbb8a Increment bower version
```

## Incorrectly named feature branch
Let's assume that some developer needs to add a new payment method to clients system. He starts from creating a new branch called: feature/wallet-payments . After couple days he presents code to his manager in order to receive feedback. It turns out that system already has module called "Wallet". To not confuse other team members it would be great to replace every occurrence of word "wallet" with something different. Once all changes are introduced the developer should not forget about changing the name of the feature branch. It can be done in three steps.

First, we need to change a name of the branch locally:
```
git branch -m old_branch new_branch
```

Then let's delete old branch:
```
git push origin :old_branch
```

And finally we can push new branch and set it's tracking:
```
git push --set-upstream origin new_branch
```

## Typo in the commit message
One of my feature branch looks like this:
```
11d47da Fix missing body open tag
37cbb8a Increment bower verison
```

In the second commit, I obviously made a typo and wrote: "verision" instead of "version". I do not want anybody to think that I am a careless person so let's get rid of this typo. Once again the interactive rebasing tool comes in to play:
```
git rebase -i HEAD~2
```

Now let's mark our commit with "reword" command:
```
pick 11d47da Fix missing body open tag
reword 37cbb8a Increment bower verison
```

Save the file, edit the message and save again. Now our commit messages are free of typos.

