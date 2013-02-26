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

            pkgs.push(S.merge(packageConfig, {
                name: 'utils',
                path: config.path
            }));
        

            //page packages
            pkgs.push(S.merge(packageConfig, {
                name: 'page',
                path: debug? pagePath : pagePathBuild
            }));

            S.config({
                packages: pkgs
            })	
        }
    };
	
	window.pageConfig = {
		'pub' : '20130230' ,
		'dashboard' : '2013333' //首页
		
		
	} 
})();
