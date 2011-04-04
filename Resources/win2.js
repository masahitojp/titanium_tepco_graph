var win2 = Titanium.UI.currentWindow;

Titanium.App.LocalConfig = require("config");
var appid = Titanium.App.LocalConfig.appid;
var xhr = Titanium.Network.createHTTPClient();
xhr.open('GET', 
	 'http://setsuden.yahooapis.jp/v1/Setsuden/latestPowerUsage?output=json&appid='+appid);

xhr.onload = function(){
  // for debug
  //Titanium.API.info(this.responseText);

  var json = JSON.parse(this.responseText);

  var usage = json.ElectricPowerUsage.Usage.$;
  var capacity = json.ElectricPowerUsage.Capacity.$;
  var hour = json.ElectricPowerUsage.Hour;
  var rate = Math.ceil(usage / capacity * 100);

  var image_url = 
    'http://chart.apis.google.com/chart?chxt=x&chbh=a,4,5&chs=225x69' +
    '&cht=bhs&chco=FFCC33,FF0000&chd=t:' + rate  + '|' + (100 - rate) +
    '&chtt=東京電力使用状況' + hour + '時台&chts=676767,14.5';

  var label = Titanium.UI.createLabel({
    color:'#999',
    text:'使用量 : 約' + rate + '％ (' + usage + "kW/" + capacity + "kW)",
    top : 0,
    font:{fontSize:16,fontFamily:'Helvetica Neue'}
  });

  var imageView = Titanium.UI.createImageView({
    image:image_url,
    width:225,
    height:69,
    top:100
  });
  win2.add(label);
  win2.add(imageView);

};

xhr.onerror = function(error){
  Titanium.API.info(error);
};

xhr.send();

var label_tmp = Titanium.UI.createLabel({
    color:'#999',
    text:'ローディング',
    top : 20,
    font:{fontSize:16,fontFamily:'Helvetica Neue'}
});
