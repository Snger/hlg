(function () {
    var S = KISSY;

    window.FB = window.FB || {
        /**
         * Config Kissy 1.2 packages
         * of a FrontBuild Page
         * @param {Object} config
         *  @param name     name of FrontBuild
         *  @param version  version of you app
         *  @param pub      timestamp of published directory
         *  @param path     url of you fbapp root
         *  @param charset 
         *  @param tag      timestamp appended
         *  @param debug    debug mode switch
         */
        config: function (config) {
            if (!config.path) {
                config.path = '';
            }
            config.path = config.path.replace(/\/$/, '');

            var pkgs = [],
                packageConfig = {},
                pagePath = S.substitute('{path}/{name}/{version}/', config),
                //switch dev or production env
                debug = config.debug? true : KISSY.Config.debug,
                pagePathBuild = S.substitute('{path}/{name}/{pub}/', config);

            //package config
            S.mix(packageConfig, config, true, ['charset', 'tag']);

            //common package
            pkgs.push(S.merge(packageConfig, {
                name: 'common',
                path: config.path
            }));
			 //gallery package
            pkgs.push(S.merge(packageConfig, {
                name: 'gallery',
                path: 'http://a.tbcdn.cn/s/kissy'
            }));

            //utils package is only for dev mode
            if (debug) {
                pkgs.push(S.merge(packageConfig, {
                    name: 'utils',
                    path: config.path
                }));
				S.Config.debug = true
            };
			pkgs.push(S.merge(packageConfig, {
                name: '1.0',
                path: config.oldpath
            }));

            //page packages
            pkgs.push(S.merge(packageConfig, {
                name: 'page',
                path: debug? pagePath : pagePathBuild
            }));

            S.config({
                packages: pkgs
            });
        }
    };
	
	window.FUNCTIONLIMIT = false;//开启  功能限制
	
	window.PAGECONFIG = {
		'pub' : '20130312' ,
		'Mcore' : '20130421' ,//core模块 
		'Mcare' : '20130606' ,//care模块
		'Mcrm' : '20130610' ,//crm模块
		'Micon' : '20130610' ,//icon模块
		'Mlist' : '20130610' ,//list模块
		'Mmaterial' : '20130520' ,//core模块
		'Mmember' : '20130331' ,//core模块
		'Moptim' : '20130516' ,//core模块
		'Mpoint' : '' ,//core模块
		'Mpromodesc' : '' ,//core模块
		'Mpromoprops' : '20130521' ,//core模块
		'Mpromotion' : '20130614' ,//core模块
		'Mratedesc' : '' ,//core模块
		'Msmart' : '20130429' ,//core模块
		'Msub' : '' ,//core模块
		'Mtool' : '20130522' ,//core模块
		'Mudp' : '' ,//core模块
		'Mshopreport' : '20130321', //
		'Mperformance' : '20130403' //
		
	}; 
})();
