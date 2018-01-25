
    var main = {
        name: 'index',
        index: true,
        message_url: 'no',
        data: {
            ajax1: {
                name: 'myMessage',
                msgType: 1,
                status: 0,
                start: 0,
                size: 8
            },
            ajax2: {
                name: 'getGatherNewsList/getHotNews',
                context: undefined,
                field: undefined
            },
            ajax3: {
                name: 'updateMsgStatus',
                msgRevIdStr: undefined
            }
        },
        //启动
        start: function() {
            $('.nav_list .platform').addClass('active');
            
            common.getParamObj();
            //main.resest();
            common.val_reset();
            common.height_reset();
            common.clearfloat();
            common.getTrumpet();
            //common.getPullDownList();
            common.bind_element();
            common.user_show();
            common.new_role_control();
            main.myMessage();
            main.getGatherNewsList();

        },
        //重置
        resest: function() {
            ajax_cms.index(common.theRequest, main.verify);
        },
        //条件刷新
        verify: function(res) {
            if (common.getCookie('verify') && common.getCookie('verify') == '1') {
                common.setCookie('verify', 0, 100000);
            } else {
                if (res.code == 1) {
                    common.setCookie('verify', 1, 100000);
                    location.reload();
                } else {
                    layer.msg('进入路径错误参数不符合要求!');
                }
            }

        },
        //我的信息
        myMessage: function() {
            ajax_cms.myMessage(main.data.ajax1, main.message_show);
        },
        //获取新闻
        getGatherNewsList: function() {
            ajax_cms.getGatherNewsList(main.data.ajax2, main.news_show);
        },
        //新闻显示
        news_show: function(res) {
            var html1 = '';
            var list = res.context.list;
        for (var i = 0; i < list.length && i < 8; i++) {
            html1 += '<li><a href="' + list[i].sourceUrl + '" target=\'_blank\'><span class="blue">\u25CF</span>' + list[i].title + '</a></li>';
        }
            $('.text_hot ul').html(html1);
        },
        //信息显示
        message_show: function(res) {
            var html1 = '';
            var list = res.context.list;
            if (list.length == 0) {
               html1 = '<li><a href="javascript:void(0)" ><span class="blue">\u25CF</span>\u6682\u65E0\u5904\u7406\u4E8B\u4EF6!</a></li>';
            }
            for (var i = 0; i < list.length && i < 6; i++) {
                var url1 = '';
                if (list[i].mark == 0) {
                    url1 = '/page/p/news/selfLibrary';
                } else if (list[i].mark == 1) {
                    url1 = '/page/p/news/auditWord';
                } else {
                    url1 = '/page/p/news/waitNews';
                }
                html1 += ' <li><a class="message_a" href="javascript:void(0)" message_url=\'' + url1 + '\' message_id=\'' + list[i].msgId + '\'><span class="blue">\u25CF</span>' + list[i].message.title + '</a></li>';
            }
            $('.text_notice ul').html(html1);

        },
        //信息跳转
        url_jump: function($this) {
            var message_id = $this.attr('message_id');
            main.message_url = $this.attr('message_url');
            main.data.ajax3.msgRevIdStr = message_id;
            ajax_cms.updateMsgStatus(main.data.ajax3, main.jump);
        },
        //跳转
        jump: function() {
            location.href = main.message_url;
        }
    }
    //运行与绑定
    main.start();
    $('.text_notice').on('click', '.message_a', function() {
        var $a = $(this).closest('a');
        main.url_jump($a);
    });
