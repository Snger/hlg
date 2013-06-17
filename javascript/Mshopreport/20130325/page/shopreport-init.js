/*
combined files : 

page/shopreport-init

*/
/**
 * @fileOverview 
 * @author  
 */
KISSY.add('page/shopreport-init',function (S) {
    // your code here
    
    return diagnosis = {
    		chart : null,
        	init : function() {
    	
    			//整体数据表
    			diagnosis.showReportView();
    			
    			//好评率
    			diagnosis.praiseReportView();
    			diagnosis.praisePieView();

    			//滞胀宝贝
    			diagnosis.stagflationPieView();

    			//中国地图
    			diagnosis.showMap();
    			diagnosis.crmPieView();

    			var memberList = DOM.children('#J_memberList');
    			S.each(memberList, function(item){
    				Event.on(item,'mouseenter mouseleave', function(ev){
    					if(ev.type == 'mouseenter'){
    						DOM.addClass(item,'current')
    					}else if(ev.type == 'mouseleave'){
    						DOM.removeClass(item,'current')
    						}
    				});
    			});
    			
            },

            //店铺整体数据
            showReportView : function() {
            	diagnosis.chart = new Highcharts.Chart({
            		chart: {
        			renderTo: 'J_overall',
        			height:300,
        			marginBottom: 60
        		},
        		title: {
        			text: '  '
        		},
        		credits :{
        			enabled :false
        		},
        		legend :{
                    floating: true,
                    align: 'left',
                    x : 370,
                    y : 5
        		},
        		 
        		xAxis: {
        			categories: xCategories,
        			labels: {
        	            step: 1
        	        }
        		},
        		 yAxis: [{
        			 	lineWidth: 1,
        		        tickWidth: 1,
        		        title: {
        		            align: 'high',
        		            offset: 0,
        		            text: '',
        		            rotation: 0,
        		            y: -10
        		        },
        	            min : 0
        	        }],
        	        
        		tooltip: {
        			formatter: function() {
        				var s;
        					s = ''+this.x +'号: '+ this.y;
        				return s;
        			}
        		},
        		
        		series: [{
        			type: 'spline',
        			name: '销售额',
        			data: salesMoney
        		
        		},{
        			type: 'spline',
        			name: '销售宝贝数',
          			data: salesNum
        		},{
        			type: 'spline',
        			name: '关列销售',
          			data: salesAssociated
        		}]
        	});
    	},

    		//好评率数据表
    	   praiseReportView : function() {
    	    	diagnosis.chart = new Highcharts.Chart({
    	    		chart: {
    				renderTo: 'J_praise',
    				height:300,
    				marginBottom: 60
    			},
    			title: {
    				text: '  '
    			},
    			credits :{
    				enabled :false
    			},
    			legend :{
    	            floating: true,
    	            align: 'left',
    	            x : 200,
    	            y : 5
    			},
    			 
    			xAxis: {
    				categories: xCategories,
    				labels: {
    		            step: 1
    		        }
    			},
    			 yAxis: [{
    				 	lineWidth: 1,
    			        tickWidth: 1,
    			        title: {
    			            align: 'high',
    			            offset: 0,
    			            text: '',
    			            rotation: 0,
    			            y: -10
    			        },
    		            min : 0
    		        }],
    		        
    			tooltip: {
    				formatter: function() {
    					var s;
    						s = ''+this.x +'号: '+ this.y;
    					return s;
    				}
    			},
    			
    			series: [{
    				type: 'spline',
    				name: '好评',
    				data: praise
    			
    			},{
    				type: 'spline',
    				name: '中评',
    	  			data: neutral
    			},{
    				type: 'spline',
    				name: '差评',
    	  			data: bad
    			}]
    		});
    	},
    	
    	//好评率圆形统计图
    	praisePieView : function() {
    		chart = new Highcharts.Chart({
    	           chart: {
    	               renderTo: 'J_praisePieView',
    	               plotBackgroundColor: null,
    	               plotBorderWidth: null,
    	               plotShadow: false,
    	               height:250
    	           },
    	           credits :{
    	    			enabled :false
    	    		},
    	           title: {
    	               text: null
    	           },
    	           tooltip: {
    	       	    pointFormat: '<b>{point.percentage}%</b>',
    	           	percentageDecimals: 1
    	           },
    	           plotOptions: {
    	               pie: {
    	                   allowPointSelect: true,
    	                   cursor: 'pointer',
    	                   dataLabels: {
    	                       enabled: true,
    	                       color: '#000000',
    	                       connectorColor: '#000000',
    	                       formatter: function() {
    	                           return this.point.name;
    	                       }
    	                   }
    	               }
    	           },
    	           series: [{
    	               type: 'pie',
    	               name: 'Browser share',
    	               data: [
    	                   ['中评',neutralPie],
    	                   ['差评',badPie],
    	                   {
    	                       name: '好评',
    	                       y: praisePie,
    	                       sliced: true,
    	                       selected: true
    	                   }
    	               ]
    	           }]
    	       });

    	},

    	//滞胀宝贝圆形统计图
    	stagflationPieView : function() {
    		chart = new Highcharts.Chart({
    	           chart: {
    	               renderTo: 'J_stagflation',
    	               plotBackgroundColor: null,
    	               plotBorderWidth: null,
    	               plotShadow: false,
    	               height:250
    	           },
    	           credits :{
    	    			enabled :false
    	    		},
    	           title: {
    	               text: null
    	           },
    	           tooltip: {
    	       	    pointFormat: '<b>{point.percentage}%</b>',
    	           	percentageDecimals: 1
    	           },
    	           plotOptions: {
    	               pie: {
    	                   allowPointSelect: true,
    	                   cursor: 'pointer',
    	                   dataLabels: {
    	                       enabled: true,
    	                       color: '#000000',
    	                       connectorColor: '#000000',
    	                       formatter: function() {
    	                           return this.point.name;
    	                       }
    	                   }
    	               }
    	           },
    	           series: [{
    	               type: 'pie',
    	               name: 'Browser share',
    	               data: [
    	                   ['有销量的宝贝',hasSales],
    	                   {
    	                       name: '滞涨宝贝',
    	                       y: stagflation,
    	                       sliced: true,
    	                       selected: true
    	                   }
    	               ]
    	           }]
    	       });
    	},

    	//中国地图
    	showMap : function(){
    		Jla.require("Ali.Map.Control.Cube");
    		Jla.require("Ali.Map.Panel.Pointer.SmartPointer");
    		function onLoad(){
    			var map = new AliMap("mapDiv",{steplessZoom:true});
    			var cubeControl = new (Jla.get("Ali.Map.Control.Cube"))();
    			map.addControl(cubeControl);

    			//通过Json来配置地图
    			cubeControl.addConfigByJson({
    				areas:mapAreas
    			});
    			
    			cubeControl.showMap("0");
    			
    			map.getAreaColor = function(area,config){
    			    var percent;
    			    if(config&&config.title){percent=parseFloat(config.title.split(" ")[0])/mapAreasBig;}
    			    else{percent=0.01;}
    			    return AliMapCubeControl.getLinearColor("#9fccff","#1556a1",percent);
    			}; //通过指定起始颜色和结束颜色来获得一个线性颜色，这样可以实现线性的颜色表
    			
    			cubeControl.setFocusColor("#ffe167"); //设置选中时区域的颜色
    			cubeControl.setNbgLineStyle({color:'#136bd4',weight:1}); //设置国家边界的线条样式
    			
    			map.getInfoWindow().setRender("Ali.Map.Panel.Pointer.SmartPointer",{
    				borderWidth:1,
    				borderStyle:{backgroundColor:'#eee'},
    				containerStyle:{backgroundColor:'#eee'},
    				titleStyle:{color:"red"},
    				contentStyle:{color:"#666"},
    				pointerStyle:{color:'#fff',borderColor:'#fff',borderWidth:2,opacity:0.7}
    			});

    			AliEvent.addListener(map,"areafocus",function(areaMap,areaConfig){
    				var content=(areaConfig && areaConfig.title)?areaConfig.title:"暂无数据";
    				map.openInfoWindow(areaMap.cp,'<font style="font-size:20px">'+areaMap.name+'</font>',content);
    			});
    		};
    		Jla.onReady(onLoad);
    	},


    	//会员属性圆形统计图
    	crmPieView : function() {
    		chart = new Highcharts.Chart({
    	           chart: {
    	               renderTo: 'J_crmPieView',
    	               plotBackgroundColor: null,
    	               plotBorderWidth: null,
    	               plotShadow: false,
    	               height:500
    	           },
    	           credits :{
    	    			enabled :false
    	    		},
    	           title: {
    	               text: null
    	           },
    	           tooltip: {
    	        	    pointFormat: '<b>{point.percentage}%</b>',
    	            	percentageDecimals: 1
    	            },
    	           plotOptions: {
    	               pie: {
    	                   allowPointSelect: true,
    	                   cursor: 'pointer',
    	                   dataLabels: {
    	                       enabled: true,
    	                       color: '#000000',
    	                       connectorColor: '#000000',
    	                       formatter: function() {
    	                           return this.point.name;
    	                       }
    	                   }
    	               }
    	           },
    	           series: [{
    	               type: 'pie',
    	               data:memChartData 
    	           }]
    	       });
    	}
    	
    }
 
}, {
    requires: []
});

