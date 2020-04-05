---
layout: post
title: Create and host personal site with jekyll and keybase
description: It's easy to create personal site with jekyll and host it on keybase.
summary: In summary it's easy to create personal site with jekyll and host it on keybase.
tags: [keybase,jekyll]
---

It's easy to create personal site like this one with jekyll and host it on keybase.

#### 1. Create website in jekyll
Follow diligently instruction on this site: [https://jekyllrb.com/docs/](https://jekyllrb.com/docs/)

#### 2. Optionally replace theme
Once I had step one working, I've replaced whole project folder with this theme [https://github.com/ronv/sidey](https://github.com/ronv/sidey)

#### 3. Change content
Change content as you like, it needs to be your site :)

#### 4. Build
Build with command as `bundle exec jekyll build`

#### 5. Deploy
Once you have built your website, all content is under `_site` folder.
Just copy everything from `_site` folder to your keybase public folder. In my case I copied to `K:\public\janheski` (I'm on windows machine).

That's all, your site is browsable on `https://[yourkeybaseuser].keybase.pub` like mine is as you can experience: [https://janheski.keybase.pub/](https://janheski.keybase.pub/)

#### 6. (Optional) Keep control on changes using git
It's good idea to version control your website using git. You have encrypted git hosting already in keybase. More on [https://keybase.io/blog/encrypted-git-for-everyone](https://keybase.io/blog/encrypted-git-for-everyone)