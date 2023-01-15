---
title: Create and host personal site with jekyll and keybase
description: It's easy to create personal site with jekyll and host it on keybase.
summary: In summary it's easy to create personal site with jekyll and host it on keybase.
tags: [keybase,jekyll]
lang: en_US
---

It's easy to create personal site like this one with jekyll and host it on keybase.

#### 1. Create website in jekyll
To install ruby and all other prerequisities for jekyll, follow diligently instruction with all links on this site: [https://jekyllrb.com/docs/](https://jekyllrb.com/docs/)

#### 2. Optionally replace theme
Once I had step one working, I've replaced whole project folder with this theme [https://github.com/ronv/sidey](https://github.com/ronv/sidey). (I've only added small tweaks to make it working for keybase pages: [https://github.com/janheski/sidey](https://github.com/janheski/sidey)).

#### 3. Change content
Change content as you like, it needs to be your site :)

To test locally run `bundle exec jekyll serve`

#### 4. Build
(Optional step for upgrade to delete `Gemfile.lock`).  
Build with command as `bundle exec jekyll build`

#### 5. Deploy
Once you have built your website, all content is under `_site` folder.
Just copy everything from `_site` folder to your keybase public folder. In my case I copied to `K:\public\janheski` (I'm on windows machine).

That's all, your site is browsable on `https://[yourkeybaseuser].keybase.pub` like mine is as you can experience: [https://janheski.keybase.pub/](https://janheski.keybase.pub/)

#### 6. (Optional) Keep control on changes using git
It's good idea to version control your website using git. You have encrypted git hosting already in keybase. More on [https://keybase.io/blog/encrypted-git-for-everyone](https://keybase.io/blog/encrypted-git-for-everyone)