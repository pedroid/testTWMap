(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,t,a){e.exports=a(27)},25:function(e,t,a){},26:function(e,t,a){},27:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),i=a(18),c=a.n(i),l=(a(25),a(4)),r=a(6),s=a(8),u=a(7),d=a(9),p=(a(26),function(e){var t=e.info;return null===t?null:o.a.createElement("div",{className:"infoModal"},o.a.createElement("p",{className:"name"},t.name),o.a.createElement("p",{className:"data"},t.data),o.a.createElement("p",{className:"description"},t.description))}),h=a(10),f=a(13),m=a(1),v=a(12),g=a(19),y=a(14),w=a.n(y),C=function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).updateColor=function(e){a.setState({color:e})};var n=N.getData("county",e.code).data,o=N.getColor(n);return a.state={color:o},a}return Object(d.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.code;N.onSubscribe(e,this.updateColor)}},{key:"render",value:function(){var e=this.props,t=e.county,a=e.path,n=e.code,i=e.setInfo,c=e.clearSelectedCounty,l=e.zoomInSelectedCounty,r=e.setSelectedInfo,s=this.state,u=s.name,d=s.color;return o.a.createElement("g",{id:u,"data-code":n,className:"county"},o.a.createElement("path",{fill:d,stroke:"white",strokeWidth:.2,d:a(t),onMouseOver:function(){i("county",n)},onClick:function(){r("county",n),c(),l(t)}}))}}]),t}(n.PureComponent),O=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).getProperties=function(e){switch(a.props.country){case"kr":var t=e.name;return{key:e.code,name:t};case"tw":default:var n=e.COUNTYNAME;return{key:e.COUNTYCODE,name:n}}},a}return Object(d.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.topoData,n=t.path,i=t.setInfo,c=t.clearSelectedCounty,l=t.zoomInSelectedCounty,r=t.setSelectedInfo;return o.a.createElement("g",{className:"countyContainer"},a.features.map(function(t,a){var s=e.getProperties(t.properties).key;return o.a.createElement(C,{key:s,code:s,county:t,path:n,setInfo:i,clearSelectedCounty:c,zoomInSelectedCounty:l,setSelectedInfo:r})}))}}]),t}(n.PureComponent),b=function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).updateColor=function(e){a.setState({color:e})};var n=N.getData("township",e.code).data,o=N.getColor(n);return a.state={color:o},a}return Object(d.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.code;N.onSubscribe(e,this.updateColor)}},{key:"render",value:function(){var e=this.props,t=e.town,a=e.path,n=e.code,i=e.setInfo,c=e.clearSelectedTown,l=e.zoomInSelectedTown,r=e.setSelectedInfo,s=t.properties,u=s.TOWNNAME,d=s.COUNTYNAME,p=this.state.color;return o.a.createElement("g",{id:u,"data-code":n,"data-county":d,className:"town",style:{opacity:0,display:"none"}},o.a.createElement("path",{fill:p,stroke:"white",strokeWidth:.05,d:a(t),onMouseOver:function(){i("township",n)},onClick:function(){r("township",n),c(),l(t)}}))}}]),t}(n.PureComponent),S=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).getProperties=function(e){switch(a.props.country){case"kr":var t=e.name;return{key:e.code,name:t};case"tw":default:var n=e.TOWNNAME;return{key:e.TOWNCODE,name:n}}},a}return Object(d.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.topoData,n=t.path,i=t.setInfo,c=t.clearSelectedTown,l=t.zoomInSelectedTown,r=t.setSelectedInfo;return o.a.createElement("g",{className:"townContainer"},a.features.map(function(t,a){var s=e.getProperties(t.properties).key;return o.a.createElement(b,{key:s,code:s,town:t,path:n,setInfo:i,clearSelectedTown:c,zoomInSelectedTown:l,setSelectedInfo:r})}))}}]),t}(n.PureComponent),E=function(e){function t(e){var a;Object(l.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).updateColor=function(e){a.setState({color:e})};var n=N.getData("village",e.code).data,o=N.getColor(n);return a.state={color:o},a}return Object(d.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.code;N.onSubscribe(e,this.updateColor)}},{key:"render",value:function(){var e=this.props,t=e.village,a=e.path,n=e.code,i=e.setInfo,c=e.clearSelectedVillage,l=e.zoomInSelectedVillage,r=e.setSelectedInfo,s=t.properties,u=s.VILLNAME,d=s.TOWNNAME,p=s.COUNTYNAME,h=this.state.color;return o.a.createElement("g",{id:u,"data-code":n,"data-town":d,"data-county":p,className:"village",style:{opacity:0,display:"none"}},o.a.createElement("path",{fill:h,stroke:"white",strokeWidth:.05,d:a(t),onMouseOver:function(){i("village",n)},onClick:function(){r("village",n),c(),l(t)}}))}}]),t}(n.PureComponent),_=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).getProperties=function(e){switch(a.props.country){case"kr":var t=e.name;return{key:e.code,name:t};case"tw":default:var n=e.VILLNAME;return{key:e.VILLCODE,name:n}}},a}return Object(d.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.topoData,n=t.path,i=t.setInfo,c=t.clearSelectedVillage,l=t.zoomInSelectedVillage,r=t.setSelectedInfo;return o.a.createElement("g",{className:"villageContainer"},a.features.map(function(t,a){var s=e.getProperties(t.properties).key;return o.a.createElement(E,{key:s,code:s,village:t,path:n,setInfo:i,clearSelectedVillage:c,zoomInSelectedVillage:l,setSelectedInfo:r})}))}}]),t}(n.PureComponent),k=function(e){function t(e){var n;Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).dealwithCountyData=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=[],o=[];switch(e){case"kr":t.features.forEach(function(e,t){var i=e.properties,c=i.name,l=i.code;n.push({name:c,code:l}),0!==a.length&&a[t].county_code===l?N.setCountyData(l,{name:a[t].county_name,data:a[t].county_data,description:a[t].description}):N.setCountyData(l,{name:c,data:parseInt(100*Math.random(),10),description:"\u6211\u662f ".concat(c," \u7684\u63cf\u8ff0\u5167\u5bb9")}),o.push({county_name:c,county_code:l,county_data:0,county_description:""})});break;case"tw":default:t.features.forEach(function(e,t){var i=e.properties,c=i.COUNTYNAME,l=i.COUNTYCODE;n.push({name:c,code:l}),0!==a.length&&a[t].county_code===l?N.setCountyData(l,{name:a[t].county_name,data:a[t].county_data,description:a[t].description}):N.setCountyData(l,{name:c,data:parseInt(100*Math.random(),10),description:"\u6211\u662f ".concat(c," \u7684\u63cf\u8ff0\u5167\u5bb9")}),o.push({county_name:c,county_code:l,county_data:0,county_description:""})})}return{counties:n,county_template:o}},n.dealwithTownshipData=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=[],o=[];switch(e){case"kr":t.features.forEach(function(e,t){var i=e.properties,c=i.name,l=i.code;n.push({name:c,code:l}),0!==a.length&&a[t].township_code===l?N.setTownshipData(l,{name:a[t].township_name,data:a[t].township_data,description:a[t].township_description}):N.setTownshipData(l,{name:c,data:parseInt(100*Math.random(),10),description:"\u6211\u662f ".concat(c," \u7684\u63cf\u8ff0\u5167\u5bb9")}),o.push({township_name:c,township_code:l,township_data:0,township_description:""})});break;case"tw":default:t.features.forEach(function(e,t){var i=e.properties,c=i.TOWNNAME,l=i.COUNTYNAME,r=i.TOWNCODE;n.push({name:c,code:r}),0!==a.length&&a[t].township_code===r?N.setTownshipData(r,{name:a[t].township_name,data:a[t].township_data,description:a[t].township_description}):N.setTownshipData(r,{name:c,data:parseInt(100*Math.random(),10),description:"\u6211\u662f ".concat(l).concat(c," \u7684\u63cf\u8ff0\u5167\u5bb9")}),o.push({township_name:c,township_code:r,township_data:0,township_description:""})})}return{towns:n,township_template:o}},n.dealwithVillageData=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],n=[],o=[];switch(e){case"kr":t.features.forEach(function(e,t){var i=e.properties,c=i.name,l=i.code;n.push({name:c,code:l}),N.setVillageData(l,{name:c,data:parseInt(100*Math.random(),10),description:"\u6211\u662f ".concat(c," \u7684\u63cf\u8ff0\u5167\u5bb9")}),0!==a.length&&a[t].village_code===l?N.setVillageData(l,{name:a[t].village_name,data:a[t].village_data,description:a[t].village_description}):N.setVillageData(l,{name:c,data:parseInt(100*Math.random(),10),description:"\u6211\u662f ".concat(c," \u7684\u63cf\u8ff0\u5167\u5bb9")}),o.push({village_name:c,village_code:l,village_data:0,village_description:""})});break;case"tw":default:t.features.forEach(function(e,t){var i=e.properties,c=i.VILLNAME,l=i.TOWNNAME,r=i.COUNTYNAME,s=i.VILLCODE;n.push({name:c,code:s}),0!==a.length&&a[t].village_code===s?N.setVillageData(s,{name:a[t].village_name,data:a[t].village_data,description:a[t].village_description}):N.setVillageData(s,{name:c,data:parseInt(100*Math.random(),10),description:"\u6211\u662f ".concat(r).concat(l).concat(c," \u7684\u63cf\u8ff0\u5167\u5bb9")}),o.push({village_name:c,village_code:s,village_data:0,village_description:""})})}return{villages:n,village_template:o}},n.writeTemplateToFile=function(e,t){var a=document.createElement("a");a.download=e,a.href="data:application/json;charset=utf-8;,"+encodeURIComponent(JSON.stringify(t)),a.target="_blank",document.body.appendChild(a),a.click(),document.body.removeChild(a)},n.initialMapSouces=function(e){var t=n.state,o=t.width,i=t.height,c=n.props.setDatas;n.setState({loading:!0},function(){switch(N.init(),e){case"kr":a.e(4).then(a.bind(null,37)).then(function(t){var a=t.krProvince,l=t.krMunicipality,r=t.krSubMunicipality,s=h.a(a,a.objects.skorea_provinces_2018_geo),u=h.a(l,l.objects.skorea_municipalities_2018_geo),d=h.a(r,r.objects.skorea_submunicipalities_2018_geo),p=n.dealwithCountyData(e,s),f=p.counties,g=(p.county_template,n.dealwithTownshipData(e,u)),y=g.towns,C=(g.township_template,n.dealwithVillageData(e,d)),O=C.villages;C.village_template;c({counties:f,towns:y,villages:O});var b=Object(v.a)().center([128,36]).translate([o/2,i/2]).scale(7e3);n.path=Object(v.b)().projection(b),n.setState({loading:!1,topoCounty:s,topoTownship:u,topoVillage:d},function(){Object(m.f)(n.mapRef).on("wheel",w()(n.wheelEvent,400))})}).catch(function(e){console.log(e)});break;case"tw":default:a.e(3).then(a.bind(null,38)).then(function(t){var a=t.twVillage,l=t.twTownship,r=t.twCounty,s=t.county_data,u=t.township_data,d=t.village_data,p=h.a(r,r.objects.county),f=h.a(a,a.objects.village),g=h.a(l,l.objects.town),y=n.dealwithCountyData(e,p,s),C=y.counties,O=(y.county_template,n.dealwithTownshipData(e,g,u)),b=O.towns,S=(O.township_template,n.dealwithVillageData(e,f,d)),E=S.villages;S.village_template;c({counties:C,towns:b,villages:E});var _=Object(v.a)().center([121,23.9]).translate([o/2,i/2]).scale(1e4);n.path=Object(v.b)().projection(_),n.setState({loading:!1,topoCounty:p,topoTownship:g,topoVillage:f},function(){Object(m.f)(n.mapRef).on("wheel",w()(n.wheelEvent,400))})}).catch(function(e){console.log(e)})}})},n.clearSelectedCounty=function(){if(0!==n.selectedCounty.selection.length){var e=n.selectedCounty.selection[1];n.selectedCounty.selection[0].select("path").attr("stroke","white").attr("stroke-width","0.05"),n.selectedCounty.selection[1].transition().duration(500).style("opacity",0).on("end",function(){e.style("display","none").attr("stroke","white").attr("stroke-width","0.05")})}if(0!==n.selectedTown.selection.length){var t=n.selectedTown.selection[1];n.selectedTown.selection[0].select("path").attr("stroke","white").attr("stroke-width","0.05"),n.selectedTown.selection[1].transition().duration(500).style("opacity",0).on("end",function(){t.style("display","none").attr("stroke","white").attr("stroke-width","0.05")})}},n.clearSelectedTown=function(){if(0!==n.selectedTown.selection.length){var e=n.selectedTown.selection[1];n.selectedTown.selection[0].select("path").attr("stroke","white").attr("stroke-width","0.05"),n.selectedTown.selection[1].transition().duration(500).style("opacity",0).on("end",function(){e.style("display","none").attr("stroke","white").attr("stroke-width","0.05")})}null!==n.selectedVillage.selection&&n.selectedVillage.selection.select("path").attr("stroke","white").attr("stroke-width","0.05")},n.clearSelectedVillage=function(){null!==n.selectedVillage.selection&&n.selectedVillage.selection.select("path").attr("stroke","white").attr("stroke-width","0.05")},n.zoomInSelectedCounty=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(null!==e){var a,o=n.props.country;switch(n.clearSelectedCounty(),n.selectedCounty.element=e,o){case"kr":a=e.properties.code;break;case"tw":default:a=e.properties.COUNTYCODE}n.selectedCounty.selection[0]=Object(m.f)(n.mapRef).select("g.countyContainer").select("g[data-code='".concat(a,"']")),n.selectedCounty.selection[1]=Object(m.f)(n.mapRef).select("g.townContainer").selectAll("g[data-code^='".concat(a,"']")),n.selectedCounty.selection[0].select(function(){return this.parentNode.appendChild(this)}),n.selectedCounty.selection[0].select("path").attr("stroke","#ffcc00").attr("stroke-width","0.7"),n.selectedCounty.selection[1].style("display","block").transition().duration(500).style("opacity",1),n.selectedTown={selection:[],element:null},t&&n.zoomAnimate(e)}},n.zoomInSelectedTown=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if(null!==e){var a,o=n.props.country;switch(n.clearSelectedTown(),n.selectedTown.element=e,o){case"kr":a=e.properties.code;break;case"tw":default:a=e.properties.TOWNCODE}n.selectedTown.selection[0]=Object(m.f)(n.mapRef).select("g.townContainer").selectAll("g[data-code='".concat(a,"']")),n.selectedTown.selection[1]=Object(m.f)(n.mapRef).select("g.villageContainer").selectAll("g[data-code^='".concat(a,"']")),n.selectedCounty.selection[0].select("path").attr("stroke","white").attr("stroke-width","0.05"),n.selectedTown.selection[0].select(function(){return this.parentNode.appendChild(this)}),n.selectedTown.selection[0].select("path").attr("stroke","#ffcc00").attr("stroke-width","0.2"),n.selectedTown.selection[1].style("display","block").transition().duration(500).style("opacity",1),t&&n.zoomAnimate(e)}},n.zoomInSelectedVillage=function(e){if(null!==e){var t,a=n.props.country;switch(n.clearSelectedVillage(),n.selectedVillage.element=e,a){case"kr":t=e.properties.code;break;case"tw":default:t=e.properties.VILLCODE}n.selectedVillage.selection=Object(m.f)(n.mapRef).select("g.villageContainer").selectAll("g[data-code='".concat(t,"']")),n.selectedTown.selection[0].select("path").attr("stroke","white").attr("stroke-width","0.05"),n.selectedVillage.selection.select(function(){return this.parentNode.appendChild(this)}),n.selectedVillage.selection.select("path").attr("stroke","#ffcc00").attr("stroke-width","0.07").transition().duration(500)}},n.zoomAnimate=function(e){var t=n.state,a=t.height,o=t.center,i=n.path.bounds(e),c=(i[0][0]+i[1][0])/2,l=(i[0][1]+i[1][1])/2,r=a/Math.max(i[1][1]-i[0][1],i[1][0]-i[0][0])*.7,s=[o[0]-c*r,o[1]-l*r];Object(m.f)(n.mapRef).transition().duration(750).call(n.zoom.transform,f.b.translate(s[0],s[1]).scale(r))},n.zoomEvent=function(){Object(m.f)(n.mapRef).selectAll("g.countyContainer, g.townContainer, g.villageContainer").attr("transform",m.b.transform)},n.zoom_fit=function(){n.clearSelectedCounty(),Object(m.f)(n.mapRef).transition().duration(750).call(n.zoom.transform,f.b),n.selectedCounty={selection:[],element:null},n.selectedTown={selection:[],element:null}},n.zoom_out=function(){null!==n.selectedTown.element?n.zoomInSelectedCounty(n.selectedCounty.element):null!==n.selectedCounty.element&&n.zoom_fit()},n.wheelEvent=function(){null!==m.b&&("down"===(m.b.deltaY>=0?"down":"up")&&n.zoom_out())},n.exportToPNG=function(){Object(g.saveSvgAsPng)(n.mapRef,"map.png")},n.goto_county=function(e){var t=n.state.topoCounty,a=n.props,o=a.country,i=a.setSelectedInfo,c=[];switch(o){case"kr":c=t.features.filter(function(t){return t.properties.code===e});break;case"tw":default:c=t.features.filter(function(t){return t.properties.COUNTYCODE===e})}i("county",e),n.zoomInSelectedCounty(c[0])},n.goto_township=function(e){var t=n.state,a=t.topoCounty,o=t.topoTownship,i=n.props,c=i.country,l=i.setSelectedInfo,r=[],s=[];switch(c){case"kr":r=a.features.filter(function(t){return 0===e.indexOf(t.properties.code)}),s=o.features.filter(function(t){return t.properties.code===e});break;case"tw":default:r=a.features.filter(function(t){return 0===e.indexOf(t.properties.COUNTYCODE)}),s=o.features.filter(function(t){return t.properties.TOWNCODE===e})}l("township",e),n.zoomInSelectedCounty(r[0],!1),n.zoomInSelectedTown(s[0])},n.goto_village=function(e){var t=n.state,a=t.topoCounty,o=t.topoTownship,i=t.topoVillage,c=n.props,l=c.country,r=c.setSelectedInfo,s=[],u=[],d=[];switch(l){case"kr":s=a.features.filter(function(t){return 0===e.indexOf(t.properties.code)}),u=o.features.filter(function(t){return 0===e.indexOf(t.properties.code)}),d=i.features.filter(function(t){return t.properties.code===e});break;case"tw":default:s=a.features.filter(function(t){return 0===e.indexOf(t.properties.COUNTYCODE)}),u=o.features.filter(function(t){return 0===e.indexOf(t.properties.TOWNCODE)}),d=i.features.filter(function(t){return t.properties.VILLCODE===e})}r("village",e),n.zoomInSelectedCounty(s[0],!1),n.zoomInSelectedTown(u[0]),n.zoomInSelectedVillage(d[0])},n.selectedCounty={selection:[],element:null},n.selectedTown={selection:[],element:null},n.selectedVillage={selection:null,element:null};var o=document.body.clientWidth/3*2-10,i=document.body.clientHeight;return n.zoom=Object(f.a)().on("zoom",n.zoomEvent),n.state={width:o,height:i,center:[o/2,i/2],loading:!0},n}return Object(d.a)(t,e),Object(r.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){var a=this.state.loading;return this.props.country!==e.country&&this.initialMapSouces(e.country),a!==t.loading}},{key:"componentWillMount",value:function(){var e=this.props.country;this.initialMapSouces(e)}},{key:"render",value:function(){var e=this,t=this.props,a=t.setInfo,n=t.country,i=t.setSelectedInfo,c=this.state,l=c.height,r=c.topoCounty,s=c.topoTownship,u=c.topoVillage;return c.loading?o.a.createElement("div",null,o.a.createElement("h1",null,"\u8f09\u5165\u5730\u5716\u4e2d")):o.a.createElement("svg",{ref:function(t){return e.mapRef=t},width:"100%",height:l},o.a.createElement(O,{country:n,topoData:r,path:this.path,setInfo:a,clearSelectedCounty:this.clearSelectedCounty,zoomInSelectedCounty:this.zoomInSelectedCounty,setSelectedInfo:i}),o.a.createElement(S,{country:n,topoData:s,path:this.path,setInfo:a,clearSelectedTown:this.clearSelectedTown,zoomInSelectedTown:this.zoomInSelectedTown,setSelectedInfo:i}),o.a.createElement(_,{country:n,topoData:u,path:this.path,setInfo:a,clearSelectedVillage:this.clearSelectedVillage,zoomInSelectedVillage:this.zoomInSelectedVillage,setSelectedInfo:i}))}}]),t}(n.Component);k.defaultProps={country:"tw"};var D=a(11),T=a(15),N=new function e(){var t=this;Object(l.a)(this,e),this.loading=!1,this.county_data=new Map,this.township_data=new Map,this.village_data=new Map,this.pathColorUpdater=new Map,this.colorLightest="#4da6ff",this.colorDeepest="#004080",this.colorScale=Object(T.a)().domain([0,100]).range([this.colorLightest,this.colorDeepest]).clamp(!0),this.init=function(){t.county_data.clear(),t.township_data.clear(),t.village_data.clear(),t.pathColorUpdater.clear()},this.onSubscribe=function(e,a){t.pathColorUpdater.set(e,a)},this.getData=function(e,a){switch(e){case"county":return t.county_data.get(a);case"township":return t.township_data.get(a);case"village":return t.village_data.get(a);default:return null}},this.setCountyData=function(e,a){t.county_data.set(e,a)},this.set_county_data=function(e,a){var n=t.county_data.get(e);n.data!==a&&(t.county_data.set(e,Object(D.a)({},n,{data:a})),t.pathColorUpdater.get(e)(t.getColor(a)))},this.set_county_description=function(e,a){var n=t.county_data.get(e);n.description!==a&&t.county_data.set(e,Object(D.a)({},n,{description:a}))},this.setTownshipData=function(e,a){t.township_data.set(e,a)},this.set_township_data=function(e,a){var n=t.township_data.get(e);n.data!==a&&(t.township_data.set(e,Object(D.a)({},n,{data:a})),t.pathColorUpdater.get(e)(t.getColor(a)))},this.set_township_description=function(e,a){var n=t.township_data.get(e);n.description!==a&&t.township_data.set(e,Object(D.a)({},n,{description:a}))},this.setVillageData=function(e,a){t.village_data.set(e,a)},this.set_village_data=function(e,a){var n=t.village_data.get(e);n.data!==a&&(t.village_data.set(e,Object(D.a)({},n,{data:a})),t.pathColorUpdater.get(e)(t.getColor(a)))},this.set_village_description=function(e,a){var n=t.village_data.get(e);n.description!==a&&t.village_data.set(e,Object(D.a)({},n,{description:a}))},this.getColor=function(e){return t.colorScale(e)},this.setColor=function(e,a,n,o){t.colorLightest=n,t.colorDeepest=o,t.colorScale=Object(T.a)().domain([e,a]).range([t.colorLightest,t.colorDeepest]).clamp(!0),t.county_data.forEach(function(e,a){var n=e.data;t.pathColorUpdater.get(a)(t.getColor(n))}),t.township_data.forEach(function(e,a){var n=e.data;t.pathColorUpdater.get(a)(t.getColor(n))}),t.village_data.forEach(function(e,a){var n=e.data;t.pathColorUpdater.get(a)(t.getColor(n))})}},I=k,V=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={info:null,counties:[],towns:[],villages:[],selectedCounty:"",selectedTown:"",selectedVillage:"",selectedCountry:"tw",selectedInfo:{},countyForm:{data:"",description:""},townshipForm:{data:"",description:""},villageForm:{data:"",description:""}},a.setInfo=function(e,t){a.setState({info:N.getData(e,t)})},a.setDatas=function(e){var t=e.counties,n=e.towns,o=e.villages,i=a.state.country,c=t[0],l={},r={};switch(i){case"kr":l=n.filter(function(e){return 0===e.code.indexOf(c.code)})[0],r=o.filter(function(e){return 0===e.code.indexOf(l.code)})[0];break;case"tw":default:l=n.filter(function(e){return 0===e.code.indexOf(c.code)})[0],r=o.filter(function(e){return 0===e.code.indexOf(l.code)})[0]}a.setState({counties:t,towns:n,villages:o,selectedCounty:JSON.stringify(c),selectedTown:JSON.stringify(l),selectedVillage:JSON.stringify(r)})},a.changeCountry=function(){a.setState({selectedCountry:a.countrySelect.value,selectedInfo:{}})},a.onCountySelect=function(e){var t=a.state,n=t.towns,o=t.villages,i=JSON.parse(e.target.value).code,c=n.filter(function(e){return 0===e.code.indexOf(i)})[0],l=o.filter(function(e){return 0===e.code.indexOf(c.code)})[0];a.setState({selectedCounty:e.target.value,selectedTown:JSON.stringify(c),selectedVillage:JSON.stringify(l),countyForm:{data:"",description:""},townshipForm:{data:"",description:""},villageForm:{data:"",description:""}})},a.onTownSelect=function(e){var t=a.state.villages,n=JSON.parse(e.target.value).code,o=t.filter(function(e){return 0===e.code.indexOf(n)})[0];a.setState({selectedTown:e.target.value,selectedVillage:JSON.stringify(o),townshipForm:{data:"",description:""},villageForm:{data:"",description:""}})},a.onVillageSelect=function(e){a.setState({selectedVillage:e.target.value,villageForm:{data:"",description:""}})},a.toCounty=function(){var e=a.state.selectedCounty;if(""!==e){var t=JSON.parse(e).code;a.map.goto_county(t);var n=N.getData("county",t),o=n.data,i=n.description;a.setState({countyForm:{data:o,description:i}})}},a.getCountyData=function(){var e=a.state.selectedCounty;if(""!==e){var t=JSON.parse(e).code,n=N.getData("county",t).data;alert(n)}},a.setCountyData=function(){var e=a.state.selectedCounty,t=JSON.parse(e).code,n=a.countyData.value;N.set_county_data(t,n)},a.getCountyDescription=function(){var e=a.state.selectedCounty;if(""!==e){var t=JSON.parse(e).code,n=N.getData("county",t).description;alert(n)}},a.setCountyDescription=function(){var e=a.state.selectedCounty,t=JSON.parse(e).code,n=a.countyDescription.value;N.set_county_description(t,n)},a.toTown=function(){var e=a.state.selectedTown;if(""!==e){var t=JSON.parse(e).code;a.map.goto_township(t);var n=N.getData("township",t),o=n.data,i=n.description;a.setState({townshipForm:{data:o,description:i}})}},a.getTownshipData=function(){var e=a.state.selectedTown;if(""!==e){var t=JSON.parse(e).code,n=N.getData("township",t).data;alert(n)}},a.setTownshipData=function(){var e=a.state.selectedTown,t=JSON.parse(e).code,n=a.townshipData.value;N.set_township_data(t,n)},a.getTownshipDescription=function(){var e=a.state.selectedTown;if(""!==e){var t=JSON.parse(e).code,n=N.getData("township",t).description;alert(n)}},a.setTownshipDescription=function(){var e=a.state.selectedTown,t=JSON.parse(e).code,n=a.townshipDescription.value;N.set_township_description(t,n)},a.toVillage=function(){var e=a.state.selectedVillage;if(""!==e){var t=JSON.parse(e).code;a.map.goto_village(t);var n=N.getData("village",t),o=n.data,i=n.description;a.setState({villageForm:{data:o,description:i}})}},a.getVillageData=function(){var e=a.state.selectedVillage;if(""!==e){var t=JSON.parse(e).code,n=N.getData("village",t).data;alert(n)}},a.setVillageData=function(){var e=a.state.selectedVillage,t=JSON.parse(e).code,n=a.villageData.value;N.set_village_data(t,n)},a.getVillageDescription=function(){var e=a.state.selectedVillage;if(""!==e){var t=JSON.parse(e).code,n=N.getData("village",t).description;alert(n)}},a.setVillageDescription=function(){var e=a.state.selectedVillage,t=JSON.parse(e).code,n=a.villageDescription.value;N.set_village_description(t,n)},a.backToTopLevel=function(){a.map.zoom_fit()},a.exportToPNG=function(){a.map.exportToPNG()},a.setSelectedInfo=function(e,t){switch(e){case"county":var n=N.getData("county",t),o=n.name,i=n.data,c=n.description;a.setState({selectedInfo:{name:o,data:i,description:c,code:t},countyForm:{data:i,description:c}});break;case"township":var l=N.getData("township",t),r=l.name,s=l.data,u=l.description;a.setState({selectedInfo:{name:r,data:s,description:u,code:t},townshipForm:{data:s,description:u}});break;case"village":var d=N.getData("village",t),p=d.name,h=d.data,f=d.description;a.setState({selectedInfo:{name:p,data:h,description:f,code:t},villageForm:{data:h,description:f}})}},a.setDefatValue=function(e,t){switch(e){case"county":var n=N.getData("county",t),o=n.data,i=n.description;a.setState({countyForm:{data:o,description:i}});break;case"township":var c=N.getData("township",t),l=c.data,r=c.description;a.setState({townshipForm:{data:l,description:r}});break;case"village":var s=N.getData("village",t),u=s.data,d=s.description;a.setState({villageForm:{data:u,description:d}})}},a.setColor=function(){""!==a.deepestColor.value||""!==a.lightestColor.value||""!==a.min.value||""!==a.max.value?N.setColor(a.min.value,a.max.value,a.lightestColor.value,a.deepestColor.value):alert("\u8acb\u6b63\u78ba\u586b\u5165\u6240\u6709\u76f8\u95dc\u503c")},a}return Object(d.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.state,a=t.info,n=t.counties,i=t.towns,c=t.villages,l=t.selectedCounty,r=t.selectedTown,s=t.selectedVillage,u=t.selectedInfo,d=t.selectedCountry,h=t.countyForm,f=t.townshipForm,m=t.villageForm;return o.a.createElement("div",{className:"App"},o.a.createElement("div",{style:{flex:2}},o.a.createElement(I,{ref:function(t){return e.map=t},country:d,setInfo:this.setInfo,setDatas:this.setDatas,setSelectedInfo:this.setSelectedInfo,setDefatValue:this.setDefatValue})),o.a.createElement("div",{style:{flex:1}},o.a.createElement("div",null,o.a.createElement("div",{className:"controller"},o.a.createElement("select",{name:"country",id:"selectCountry",ref:function(t){return e.countrySelect=t},defaultValue:d},o.a.createElement("option",{value:"tw"},"\u53f0\u7063"),o.a.createElement("option",{value:"kr"},"\u97d3\u570b")),o.a.createElement("input",{type:"button",onClick:this.changeCountry,value:"\u78ba\u8a8d"})),o.a.createElement("div",{className:"controller"},o.a.createElement("div",null,o.a.createElement("select",{name:"county",id:"selectCounty",ref:function(t){return e.countySelect=t},onChange:this.onCountySelect,value:l},n.map(function(e,t){return o.a.createElement("option",{key:e.code,value:JSON.stringify(e)},e.name)})),o.a.createElement("input",{type:"button",onClick:this.toCounty,value:"\u50b3\u9001"}),o.a.createElement("input",{type:"button",onClick:this.getCountyData,value:"\u53d6\u5f97\u8cc7\u6599"}),o.a.createElement("input",{type:"button",onClick:this.getCountyDescription,value:"\u53d6\u5f97\u63cf\u8ff0"})),o.a.createElement("div",null,o.a.createElement("input",{type:"text",ref:function(t){return e.countyData=t},defaultValue:h.data}),o.a.createElement("input",{type:"button",onClick:this.setCountyData,value:"\u8a2d\u5b9a\u8cc7\u6599"})),o.a.createElement("div",null,o.a.createElement("input",{type:"text",ref:function(t){return e.countyDescription=t},defaultValue:h.description}),o.a.createElement("input",{type:"button",onClick:this.setCountyDescription,value:"\u8a2d\u5b9a\u63cf\u8ff0"}))),o.a.createElement("div",{className:"controller"},o.a.createElement("div",null,o.a.createElement("select",{name:"town",id:"selectTown",ref:function(t){return e.townSelect=t},onChange:this.onTownSelect,value:r},i.map(function(e){var t=e.name,a=e.code,n=JSON.parse(l);return 0===e.code.indexOf(n.code)?o.a.createElement("option",{key:a,value:JSON.stringify(e)},t):null})),o.a.createElement("input",{type:"button",onClick:this.toTown,value:"\u50b3\u9001"}),o.a.createElement("input",{type:"button",onClick:this.getTownshipData,value:"\u53d6\u5f97\u8cc7\u6599"}),o.a.createElement("input",{type:"button",onClick:this.getTownshipDescription,value:"\u53d6\u5f97\u63cf\u8ff0"})),o.a.createElement("div",null,o.a.createElement("input",{type:"text",ref:function(t){return e.townshipData=t},defaultValue:f.data}),o.a.createElement("input",{type:"button",onClick:this.setTownshipData,value:"\u8a2d\u5b9a\u8cc7\u6599"})),o.a.createElement("div",null,o.a.createElement("input",{type:"text",ref:function(t){return e.townshipDescription=t},defaultValue:f.description}),o.a.createElement("input",{type:"button",onClick:this.setTownshipDescription,value:"\u8a2d\u5b9a\u63cf\u8ff0"}))),o.a.createElement("div",{className:"controller"},o.a.createElement("div",null,o.a.createElement("select",{name:"village",id:"selectVillage",ref:function(t){return e.villageSelect=t},onChange:this.onVillageSelect,value:s},c.map(function(e){var t=e.name,a=e.code,n=JSON.parse(r);return 0===e.code.indexOf(n.code)&&""!==t?o.a.createElement("option",{key:a,value:JSON.stringify(e)},t):null})),o.a.createElement("input",{type:"button",onClick:this.toVillage,value:"\u50b3\u9001"}),o.a.createElement("input",{type:"button",onClick:this.getVillageData,value:"\u53d6\u5f97\u8cc7\u6599"}),o.a.createElement("input",{type:"button",onClick:this.getVillageDescription,value:"\u53d6\u5f97\u63cf\u8ff0"})),o.a.createElement("div",null,o.a.createElement("input",{type:"text",ref:function(t){return e.villageData=t},defaultValue:m.data}),o.a.createElement("input",{type:"button",onClick:this.setVillageData,value:"\u8a2d\u5b9a\u8cc7\u6599"})),o.a.createElement("div",null,o.a.createElement("input",{type:"text",ref:function(t){return e.villageDescription=t},defaultValue:m.description}),o.a.createElement("input",{type:"button",onClick:this.setVillageDescription,value:"\u8a2d\u5b9a\u63cf\u8ff0"}))),o.a.createElement("div",{className:"controller"},o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement("input",{type:"number",ref:function(t){return e.min=t},placeholder:"\u6700\u5927\u503c"}),o.a.createElement("input",{type:"number",ref:function(t){return e.max=t},placeholder:"\u6700\u5c0f\u503c"})),o.a.createElement("div",null,o.a.createElement("input",{type:"text",ref:function(t){return e.lightestColor=t},placeholder:"\u6700\u6dfa\u984f\u8272"}),o.a.createElement("input",{type:"text",ref:function(t){return e.deepestColor=t},placeholder:"\u6700\u6df1\u984f\u8272"})),o.a.createElement("input",{type:"button",onClick:this.setColor,value:"\u8a2d\u5b9a\u984f\u8272"}))),o.a.createElement("div",null,o.a.createElement("input",{type:"button",value:"\u56de\u5230\u6700\u4e0a\u5c64",onClick:this.backToTopLevel})),o.a.createElement("div",null,o.a.createElement("input",{type:"button",value:"\u5132\u5b58PNG\u5716\u6a94",onClick:this.exportToPNG})),0!==Object.keys(u).length?o.a.createElement("div",{className:"controller"},o.a.createElement("p",null,"\u540d\u7a31\uff1a ",u.name),o.a.createElement("p",null,"Code\uff1a ",u.code),o.a.createElement("p",null,"\u8cc7\u6599\uff1a ",u.data),o.a.createElement("p",null,"\u63cf\u8ff0\uff1a ",u.description)):null),o.a.createElement(p,{info:a})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(V,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[20,1,2]]]);
//# sourceMappingURL=main.09a293f2.chunk.js.map