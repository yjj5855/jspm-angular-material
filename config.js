System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  bundles: {
    "build.js": [
      "source/app.js",
      "github:angular/bower-angular@1.4.6",
      "npm:jquery@2.1.4",
      "source/core/core-module.js",
      "npm:mdi@1.2.65/css/materialdesignicons.css!github:systemjs/plugin-css@0.1.17",
      "public/css/app.css!github:systemjs/plugin-css@0.1.17",
      "npm:jquery@2.1.4/dist/jquery",
      "github:angular/bower-angular-route@1.4.6",
      "github:angular/bower-angular-resource@1.4.6",
      "source/service/ApiConfig.js",
      "github:angular/bower-angular@1.4.6/angular",
      "source/env.js",
      "source/filter/format-message.js",
      "source/states/chat/chat-module.js",
      "source/filter/format-date.js",
      "source/service/WXService.js",
      "source/service/SocketService.js",
      "source/core/core-router.js",
      "github:jspm/nodelibs-process@0.1.2",
      "github:angular/bower-angular-route@1.4.6/angular-route",
      "github:angular/bower-angular-resource@1.4.6/index",
      "source/states/chat/chat-route.js",
      "source/lib/weixin/jweixin-1.0.0.js",
      "source/lib/socket-client/socket.io-1.2.0.js",
      "npm:babel-runtime@5.8.24/core-js/promise",
      "github:jspm/nodelibs-process@0.1.2/index",
      "github:angular/bower-angular-resource@1.4.6/angular-resource",
      "source/states/chat/chat-controller.js",
      "npm:core-js@1.1.4/library/fn/promise",
      "source/states/chat/chat-weixin-controller.js",
      "npm:process@0.11.2",
      "source/states/chat/chat-value.js",
      "source/components/face/face-directive.js",
      "source/states/chat/bottom_sheet/send-other-message-controller.js",
      "source/components/btn_back/btn-back-directive.js",
      "npm:core-js@1.1.4/library/modules/web.dom.iterable",
      "npm:core-js@1.1.4/library/modules/es6.object.to-string",
      "npm:core-js@1.1.4/library/modules/es6.promise",
      "npm:core-js@1.1.4/library/modules/es6.string.iterator",
      "npm:core-js@1.1.4/library/modules/$.core",
      "npm:angular-material@0.11.0",
      "npm:process@0.11.2/browser",
      "npm:core-js@1.1.4/library/modules/$.iterators",
      "github:jspm/nodelibs-process@0.1.1",
      "npm:core-js@1.1.4/library/modules/$",
      "npm:core-js@1.1.4/library/modules/es6.array.iterator",
      "npm:core-js@1.1.4/library/modules/$.library",
      "npm:core-js@1.1.4/library/modules/$.ctx",
      "npm:core-js@1.1.4/library/modules/$.global",
      "npm:core-js@1.1.4/library/modules/$.classof",
      "npm:core-js@1.1.4/library/modules/$.is-object",
      "npm:core-js@1.1.4/library/modules/$.an-object",
      "npm:core-js@1.1.4/library/modules/$.def",
      "npm:core-js@1.1.4/library/modules/$.a-function",
      "npm:core-js@1.1.4/library/modules/$.set-proto",
      "npm:core-js@1.1.4/library/modules/$.same",
      "npm:core-js@1.1.4/library/modules/$.for-of",
      "npm:core-js@1.1.4/library/modules/$.strict-new",
      "npm:core-js@1.1.4/library/modules/$.species",
      "npm:core-js@1.1.4/library/modules/$.wks",
      "npm:core-js@1.1.4/library/modules/$.uid",
      "npm:core-js@1.1.4/library/modules/$.support-desc",
      "npm:core-js@1.1.4/library/modules/$.iter-detect",
      "npm:core-js@1.1.4/library/modules/$.microtask",
      "npm:core-js@1.1.4/library/modules/$.tag",
      "npm:core-js@1.1.4/library/modules/$.mix",
      "npm:core-js@1.1.4/library/modules/$.string-at",
      "npm:core-js@1.1.4/library/modules/$.iter-define",
      "npm:angular-material@0.11.0/index",
      "source/states/chat/chat-template.html!github:systemjs/plugin-text@0.0.2",
      "source/components/face/face-template.html!github:systemjs/plugin-text@0.0.2",
      "source/components/face/face-weixin-template.html!github:systemjs/plugin-text@0.0.2",
      "source/states/chat/chat-weixin-template.html!github:systemjs/plugin-text@0.0.2",
      "source/states/chat/bottom_sheet/send-other-message-template.html!github:systemjs/plugin-text@0.0.2",
      "npm:core-js@1.1.4/library/modules/$.to-iobject",
      "npm:core-js@1.1.4/library/modules/$.unscope",
      "npm:core-js@1.1.4/library/modules/$.iter-step",
      "npm:core-js@1.1.4/library/modules/$.cof",
      "npm:core-js@1.1.4/library/modules/$.iter-call",
      "npm:core-js@1.1.4/library/modules/$.to-length",
      "npm:core-js@1.1.4/library/modules/$.is-array-iter",
      "npm:core-js@1.1.4/library/modules/core.get-iterator-method",
      "npm:core-js@1.1.4/library/modules/$.fails",
      "npm:core-js@1.1.4/library/modules/$.task",
      "npm:core-js@1.1.4/library/modules/$.shared",
      "npm:core-js@1.1.4/library/modules/$.has",
      "npm:core-js@1.1.4/library/modules/$.redef",
      "npm:core-js@1.1.4/library/modules/$.hide",
      "npm:core-js@1.1.4/library/modules/$.to-integer",
      "github:jspm/nodelibs-process@0.1.1/index",
      "npm:core-js@1.1.4/library/modules/$.defined",
      "npm:core-js@1.1.4/library/modules/$.iter-create",
      "github:angular/bower-angular-animate@1.4.6",
      "npm:angular-material@0.11.0/angular-material",
      "npm:angular-material@0.11.0/angular-material.css!github:systemjs/plugin-css@0.1.17",
      "github:angular/bower-angular-aria@1.4.6",
      "npm:core-js@1.1.4/library/modules/$.html",
      "npm:core-js@1.1.4/library/modules/$.invoke",
      "npm:core-js@1.1.4/library/modules/$.iobject",
      "npm:core-js@1.1.4/library/modules/$.dom-create",
      "npm:process@0.10.1",
      "npm:core-js@1.1.4/library/modules/$.property-desc",
      "github:angular/bower-angular-aria@1.4.6/angular-aria",
      "github:angular/bower-angular-animate@1.4.6/angular-animate",
      "npm:process@0.10.1/browser"
    ]
  },

  map: {
    "angular": "github:angular/bower-angular@1.4.6",
    "angular-material": "npm:angular-material@0.11.0",
    "angular-resource": "github:angular/bower-angular-resource@1.4.6",
    "angular-route": "github:angular/bower-angular-route@1.4.6",
    "babel": "npm:babel-core@5.8.25",
    "babel-runtime": "npm:babel-runtime@5.8.24",
    "clean-css": "npm:clean-css@3.4.4",
    "core-js": "npm:core-js@1.1.4",
    "css": "github:systemjs/plugin-css@0.1.17",
    "jquery": "npm:jquery@2.1.4",
    "mdi": "npm:mdi@1.2.65",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular/bower-angular-animate@1.4.6": {
      "angular": "github:angular/bower-angular@1.4.6"
    },
    "github:angular/bower-angular-aria@1.4.6": {
      "angular": "github:angular/bower-angular@1.4.6"
    },
    "github:angular/bower-angular-route@1.4.6": {
      "angular": "github:angular/bower-angular@1.4.6"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.5.0"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:amdefine@1.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:angular-material@0.11.0": {
      "angular": "github:angular/bower-angular@1.4.6",
      "angular-animate": "github:angular/bower-angular-animate@1.4.6",
      "angular-aria": "github:angular/bower-angular-aria@1.4.6",
      "css": "github:systemjs/plugin-css@0.1.17"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.24": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:buffer@3.5.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "ieee754": "npm:ieee754@1.1.6",
      "is-array": "npm:is-array@1.0.1"
    },
    "npm:clean-css@3.4.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "commander": "npm:commander@2.8.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "source-map": "npm:source-map@0.4.4",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:commander@2.8.1": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "graceful-readlink": "npm:graceful-readlink@1.0.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@1.1.4": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-util-is@1.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:graceful-readlink@1.0.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:jquery@2.1.4": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:readable-stream@1.1.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:source-map@0.4.4": {
      "amdefine": "npm:amdefine@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.13"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
