# MMM-Glance
To glance specific module and hide others.
You can use this to reveal some module(s) and hide others.

## Installation
```sh
cd <Your MagicMirror Directory>/modules
git clone https://github.com/splattner/MMM-Glance
```


## Configuration
Add below codes in your `config.js`.
```javascript
{
  module: 'MMM-Glance',
}
```

You can use more detailed configuration like these; See the below section.
```javascript
{
  module: 'MMM-Glance',
  config: {
    alias: {
      "news" : "newsfeed",
      "party mode" : ["clock", "helloworld", "MMM-Something"],
      ...
    }  
  }
}
```

### Configuration values

|name |default value |description
|--- |---|---
|alias | {`name` : `module name` or array of `module name`} | - You can use this field for glancing multi modules at a same time. <br>e.g) `{"party mode":["clock", "MMM-DropboxWallpaper"}` => You can reveal these 2 modules by calling `party mode`<br> - When you feel the difficutly to type or to pronounce `MMM-BlahBlahModule`, you can use this field for changing easier name. <br>e.g) `{"sensor":"MMM-HDC1080"}`

## How to use
### with Notification
```javascript
this.sendNotification("GLANCE_ON", {name:"helloworld"})
this.sendNotification("GLANCE_OFF")
```
|notification |payload |description
|--- |--- |---
|GLANCE_ON | {name: "`<module name>`"} | reveal some module(s). alias for module name is available.
|GLANCE_OFF | | back to previous screen.
