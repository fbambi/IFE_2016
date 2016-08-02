# `$.i18n()`方法

## 概述

`$.i18n()`方法用于前端页面国际化处理,可批量替换静态DOM元素文本为目标语言文本


##  参数
`$.i18n()` 方法可不接受参数，或者接受1个参数：


> `language[string]`



`language`：可选，代表要在切换的语言，其格式必须符合浏览器语言代码标准格式，如"zh"，"zh-CN","en","en-US"
&nbsp;例.切换到英语（美国）
>  `$.i18n("en-US");`


## 内部实现：
整个方法由两个函数组成，`getLang()`和`toggleLang()`，分别用于获取语言设置以及切换文本。
### `getLang():`


```javascript
    function getLang(){
        if (document.cookie) {
            // xx-XX or xx  eg:en_US or en
            if (document.cookie.match(/lang=[a-z]{2}-?[A-Z]{0,2}/) !== null) {
                return (document.cookie.match(/lang=[a-z]{2}-?[A-Z]{0,2}/))[0]
                .split("=")[1];
            }
        }
        document.cookie = "lang=" +
        (navigator.language /* UI Language for Chrome */ ||
            navigator.userLanguage);
        return navigator.language || navigator.userLanguage /* IE */ ;
    }
```
1.判断域名下cookie是否存在，若存在是否符合语言代码格式
```javascript
        if (document.cookie) {
            // xx-XX or xx  eg:en_US or en
            if (document.cookie.match(/lang=[a-z]{2}-?[A-Z]{0,2}/) !== null) {
                return (document.cookie.match(/lang=[a-z]{2}-?[A-Z]{0,2}/))[0]
                    .split("=")[1];
            }
        }
```
2.上述任一条件不满足则读取浏览器语言设置并将其写入cookie，方便下次读取
```javascript
        document.cookie = "lang=" +
            (navigator.language /* UI Language for Chrome */ ||
            navigator.userLanguage);
        return navigator.language || navigator.userLanguage /* IE */ ;
```
3.函数最终返回一个语言代码，将作为下面语言切换的依据
<br>

### `toggleLang()：`
```javascript
    function toggleLang(language) {
            var ajaxConfig = {},
                langData = {};

            ajaxConfig = {
                url: null,
                async: false,
                cache: true,
                dataType: 'text',
                success: function(data) {},
                error: function() {
                    console.log('Failed to download or parse');
                }
            };

            $.extend(ajaxConfig, {
                url: filename,
                success: function(data) {
                    langData = JSON.parse(data);
                }
            });
            $.ajax(ajaxConfig);

            $('#toggle').click(function() {
                console.time("切换");
                var modul, key;
                $('[data-lang]').each(function() {
                    modul = $(this).attr("data-lang").split(".")[0];
                    key = $(this).attr("data-lang").split(".")[1];
                    $(this).text(langData[modul][key]);
                });
                console.timeEnd("切换");
            });
        }
```
1.定义两个对象，`ajaxConfig`为`ajax`请求的配置，`langData`为获取到的`JSON`数据
```javascript
        var ajaxConfig = {},
        langData = {};
```
2.设置`ajax`配置文件，其中`async`应设为同步请求，切换期间可提供等待提示
```javascript
        ajaxConfig = {
            url: null,
            async: false,
            cache: true,
            dataType: 'text',
            success: function(data) {},
            error: function() {
                console.log('Failed to download or parse');
            }
        };
```
3.根据传入的语言代码拼成语言`JSON`文件，设置回调函数取出返回的`data`，将其转化为`JSON`格式后传给`langData`
```javascript
        $.extend(ajaxConfig, {
            url: 'i18n/' + language + '.json',
            success: function(data) {
                langData = JSON.parse(data);
            }
        });
```
4.发送`ajax`请求
```javascript
        $.ajax(ajaxConfig);
```
5.为页面设置好的按钮绑定切换函数：遍历含有`"data-key"`属性的DOM元素，将其`"data-key`"属性的值分解`为module`和`key`，在`langData`中寻找`key`对应的值作为`DOM`的文本。
```javascript
        $('#toggle').click(function() {
                console.time("切换");
                var modul, key;
                $('[data-lang]').each(function() {
                    modul = $(this).attr("data-lang").split(".")[0];
                    key = $(this).attr("data-lang").split(".")[1];
                    $(this).text(langData[modul][key]);
                });
                console.timeEnd("切换");
            });
```
6.主体执行部分，判断有无参数，若有则直接使用参数，没有则用`getLang()`获取，执行`toggleLan()`
```javascript
    lang = arguments[0] || getLang();
    toggleLang(lang);
```
## 整体代码

```javascript

    function i18n( /* language */ ) {
        var lang;
        function getLang() {
            if (document.cookie) {
                // xx-XX or xx  eg:en_US or en
                if (document.cookie.match(/lang=[a-z]{2}-?[A-Z]{0,2}/) !== null) {
                    return (document.cookie.match(/lang=[a-z]{2}-?[A-Z]{0,2}/))[0].split("=")[1];
                }
            }
            document.cookie = "lang=" +
                (navigator.language /* UI Language for Chrome */ ||
                navigator.userLanguage);
            return navigator.language || navigator.userLanguage /* IE */ ;
        }

        function toggleLang(language) {
            var ajaxConfig = {},
                langData = {};

            ajaxConfig = {
                url: null,
                async: false,
                cache: true,
                dataType: 'text',
                success: function(data) {},
                error: function() {
                    console.log('Failed to download or parse');
                }
            };

            $.extend(ajaxConfig, {
                url: 'i18n/' + language + '.json',
                success: function(data) {
                    langData = JSON.parse(data);
                }
            });
            $.ajax(ajaxConfig);

            $('#toggle').click(function() {
                console.time("切换");
                var modul, key;
                $('[data-lang]').each(function() {
                    modul = $(this).attr("data-lang").split(".")[0];
                    key = $(this).attr("data-lang").split(".")[1];
                    $(this).text(langData[modul][key]);
                });
                console.timeEnd("切换");
            });
        }
        lang = arguments[0] || getLang();
        toggleLang(lang);
    }
```
