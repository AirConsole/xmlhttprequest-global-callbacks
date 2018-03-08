# XMLHttpRequest Global Callbacks
A javascript library that allows for global XMLHTTPRequest callbacks

## Why do you need this library?

Assume you would like to globally log onerror events in XMLHTTPRequests.
It's easier to have one global callback that does this, then setting onerror on every request.

## How to use this library
Just download xmlhttprequest-global-callbacks.min.js and include it in your html page.

```html
<script type="text/javascript" src="xmlhttprequest-length-computable.min.js"></script>
```
Now you can register global callbacks for all XMLHTTPRequests using `window.xmlhttprequest_global_callbacks`

```javascript
window.xmlhttprequest_global_callbacks = {
  "progress": function(event, request_method, request_url) {
    console.log(event, url);
  },
  "load": function(event, request_method, request_url) {
    console.log(event, url);
  },
  "error": function(event, request_method, request_url) {
    console.log(event, url);
  }
}
```

Any event name is possible.

## Arguments passed to global callbacks
* `event`: The original event that was triggered
* `request_method`: The request method passed to `XMLHTTPRequest.open()`
* `request_url`: The url passed to `XMLHTTPRequest.open()`