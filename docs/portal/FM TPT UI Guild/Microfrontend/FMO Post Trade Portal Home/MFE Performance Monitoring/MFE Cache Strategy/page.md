# Introduction

The drawback of long-term cache is that web can’t automatically detect and refresh after static files update.

The drawback of no cache is that web always detect whether static files are update, which will take extra time.

Base on that, we can make entry file of each layer as “no-cache” and make all subsequent static files (lazy loading files) as “long-term cache”.

Here is a diagram on it,

Let’s make cashflow tile as example, each time user refresh browser, browser will detect entry file of base/ratan_container/ratan_cashflow if they are updated.

If cashflow is not update, then reuse all xxx.ratan_cashflow.js from cache.

If cashflow is updated, then ratan_cashflow.js should be a new file with new subsequent files, then all static files should be fetch again.

# Conclusion

This solution can save time on requesting all lazy load static files (300ms -> 5ms), reducing "loading" appearing times and lazy loaded components like quick search would display immediately.

***Advantage of hybrid cache will not take effect on first time loading, because it should load all static files.***

# Still Not Included

1.User can seamless to get the latest UI.

No, still have to logout or refresh page to get access to latest.

2. User don't have to wait for loading.

No, user still need to wait for loading the latest UI because entry are still no-cache. But indeed, user can get lazy loaded component directly without waiting, this is advantage from current strategy.

# Static File Expire Time

| Type | Type | Example | Cache | Expire Time | Comment |
| --- | --- | --- | --- | --- | --- |
| Entry | js | base.js/mfe-ratan-container.js/mfe-cashflow.js | No | No-Cache, re-fetch each time load. | |
| Chunks | js | 2c6bc81d1105d33cd9e4.975.ratan_cashflow_blotter.js | Yes | 120d. | |
| Image | jpg/jpeg/gif/svg | photo_md.jpg/e6bcb5bdb7eb342e2441.svg | Yes | 120d. | |
| CSS | css | ag-grid.min.css | Yes | 120d. | |
| Font | woff2 | fontawesome-webfont.woff2 | Yes | 120d. | |
| Media | mp3/mp4 | | | | Not Included |
| Other | json/ico | manifest.json/favicon.ico | Yes | 120d. | |

# Implementation
