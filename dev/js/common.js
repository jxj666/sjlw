'use strict';

//*********
// _________common
var common = {
    i: 0,
    theRequest: {},
    k: '',

    data: {
        storeType: 1,
        ajax1: {
            name: 'getTrumpet'
        },
        ajax2: {
            name: 'info',
            newsId: undefined
        },
        ajax3: {
            name: 'derived',
            newsId: undefined
        },
        ajax4: {
            name: 'lockNews',
            newsId: undefined
        },
        ajax4: {
            name: 'getAllAuthor'
        }

    },
    //获取储存
    getCookie: function(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    },
    //设置储存
    setCookie: function(c_name, value, expiredays) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
    },
    //页面变量值获取
    val_reset: function() {
        var v1 = $('.val3').text();
        if (v1) {
            common.k = v1;
        }
        var v2 = $('.val5').text();
        $('.nav_user .user img').hide();
        common.role = {};
        common.role.val1 = v2.search(/CMS001/) > -1 ? true : false;
        common.role.val2 = v2.search(/CMS002/) > -1 ? true : false;
        common.role.val3 = v2.search(/CMS003/) > -1 ? true : false;
        common.role.val4 = v2.search(/CMS004/) > -1 ? true : false;
        common.role.val5 = v2.search(/CMS005/) > -1 ? true : false;
        common.role.val6 = v2.search(/CMS006/) > -1 ? true : false;
        common.role.val7 = v2.search(/CMS007/) > -1 ? true : false;
        common.role.val8 = v2.search(/CMS008/) > -1 ? true : false;
        common.role.val9 = v2.search(/CMS009/) > -1 ? true : false;
        common.role.val10 = v2.search(/CMS010/) > -1 ? true : false;
        common.role.val11 = v2.search(/CMS011/) > -1 ? true : false;
        common.role.val12 = v2.search(/CMS012/) > -1 ? true : false;
        common.role.val13 = v2.search(/CMS013/) > -1 ? true : false;
        common.role.val14 = v2.search(/CMS014/) > -1 ? true : false;
        common.role.val15 = v2.search(/CMS015/) > -1 ? true : false;
        common.role.val16 = v2.search(/CMS016/) > -1 ? true : false;
        common.role.val17 = v2.search(/CMS017/) > -1 ? true : false;
        common.role.val18 = v2.search(/CMS018/) > -1 ? true : false;
        common.role.val19 = v2.search(/CMS019/) > -1 ? true : false;
        common.role.val20 = v2.search(/CMS020/) > -1 ? true : false;
    },
    //新闻部分管理
    new_role_control: function() {
        //return;
        $('.left-list .item1').hide();
        $('.left-list .item2').hide();
        $('.left-list .item3').hide();
        $('.left-list .item4').hide();
        $('.left-list .item5').hide();
        $('.left-list .item6').hide();
        $('.audit .s_exam1').hide();
        $('.audit .s_exam2').hide();
        $('.audit .s_exam3').hide();
        $('.audit .s_exam6').hide();
        $('.audit .ys_exam1').hide();
        $('.audit .ys_exam2').hide();
        $('.audit .ys_exam3').hide();
        $('.audit .ys_exam6').hide();
        $('.switch_self2').hide();
        $('.switch_wait2').hide();




        $('.left-list .item1').show();
        //普通
        if (common.role.val1) {
            $('.left-list .item3').show();
        }
        //一审
        if (common.role.val2) {
            $('.left-list .item2').show();
            $('.audit .s_exam1').show();
        }
        //二审
        if (common.role.val3) {
            $('.left-list .item2').show();
            $('.audit .s_exam2').show();
        }
        //签发
        if (common.role.val4) {
            $('.left-list .item2').show();
            $('.audit .s_exam3').show();
            $('.audit .s_exam6').show();
        }
        //设计部
        if (common.role.val5) {
            $('.left-list .item3').show();
        }
        //总审1
        if (common.role.val6) {

        }
        //总审2
        if (common.role.val7) {

        }
        //选题浏览
        if (common.role.val8) {
            $('.left-list .item5').show();
        }
        //选题审辑
        if (common.role.val9) {
            $('.left-list .item5').show();
        }
        //高级选题
        if (common.role.val10) {
            $('.left-list .item5').show();
        }
        //外部人员选题查看
        if (common.role.val11) {
            $('.left-list .item5').show();
        }
        //终审
        if (common.role.val12) {
            $('.audit .s_exam6').show();
        }
        //研报普通
        if (common.role.val13) {
            $('.switch_self2').show();
        }
        //研报一审
        if (common.role.val14) {
            $('.left-list .item6').show();
            $('.audit .ys_exam1').show();

        }
        //研报二审
        if (common.role.val15) {
            $('.left-list .item6').show();
            $('.audit .ys_exam2').show();
        }
        //研报签发
        if (common.role.val16) {
            $('.left-list .item6').show();
            $('.audit .ys_exam3').show();

        }
        //研报导出
        if (common.role.val17) {
            $('.switch_wait2').show();
        }
        //研报总审1
        if (common.role.val18) {

        }
        //研报总审2
        if (common.role.val19) {

        }
        if (common.role.val20) {

        }
    },

    //打印 ajax 回调
    console_data: function(res, name) {
        common.i += 1;
        if (res.code != '1') {
            //console.log('运行排序:' + common.i, name + '接口错误! ->' + res.msg);
        } else {
            //console.log('运行排序:' + common.i, '接口:' + name, res);
        }
    },
    //处理单个 url 数据
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(?:&|$)", 'i');
        var str_arr = window.location.search.substr(1).match(reg);
        return str_arr != null ? str_arr[2] : null;
    },
    //处理全部 url 数据
    getParamObj: function() {
        var str = location.search;
        if (!str) {
            return {};
        }
        str = str.substr(1);
        var theRequest = {};
        var strs = str.split('&');
        $.each(strs, function(i, v) {
            theRequest[v.split('=')[0]] = decodeURIComponent(v.split('=')[1]);
        });
        common.theRequest = theRequest;
    },
    //ajax 调用主程序
    ajax: function(url, method, data, explain, callback) {
        var port = explain;
        port = port + ' : ' + url;
        $.ajax({
            url: url,
            method: method,
            data: data
        }).done(function(res) {
            common.console_data(res, port);
            if (res.code != '1') {
                layer.msg(port + ' 返回数据出错!');
            } else {
                callback && callback(res);
            }
        }).fail(function(jqXHR, textStatus) {
            //console.log(jqXHR, textStatus);
        });
    },
    //获取通知信息
    getTrumpet: function() {
        common.data.ajax1.uid = common.k;
        ajax_news.getTrumpet(common.data.ajax1, common.message_show);
    },
    //通知信息展示
    message_show: function(res) {
        var html1 = '<a href="javascript:void(0)"><li onclick="location.href=\'/page/p/news/auditWord.html\'">\u5F85\u5ba1\u6838<span>' + res.context.news + '</span></li></a><a href="javascript:void(0)"><li onclick="location.href=\'/page/p/topic/themeManage\'">\u9009\u9898</li></a><a href="javascript:void(0)"><li onclick="location.href=\'/page/p/message/message\'">\u6D88\u606F\u4E2D\u5FC3<span>' + res.context.unReadMsg + '</span></li></a>';
        $('.pop_alert ul').html(html1);
    },
    //选择信息展示
    select_show: function(data) {
        common.s_channel = [];
        common.s_field = [];
        //common.s_author = [];

        var list = data.context.dictChannels || [];
        var list2 = data.context.dictFields || [];
        var list3 = data.context.users || [];


        function show_l(list, data, e, key, name) {

            if ($(e)) {
                for (var i = 0; i < list.length; i++) {
                    data.push({
                        id: list[i].id,
                        name: list[i].name,
                        username: list[i].username
                    })
                }
                var html1 = '<option value="0">\u6240\u6709' + name + '</option>';
                var html2 = '';
                for (var i = 0, l = data; i < l.length; i++) {
                    if (key == 3) {
                        html2 = l[i].username;
                    } else {
                        html2 = l[i].name;
                    }
                    html1 += '<option value="' + html2 + '">' + html2 + '</option>';
                }
                $(e).html(html1);
            }
        }
        show_l(list, common.s_channel, '#s_channel', 1, '渠道');
        show_l(list2, common.s_field, '#s_field', 2, '领域');
        //show_l(list3, common.s_author, '#s_author', 3, '作者');

    },
    //作者展示
    author_show: function(data) {
        common.s_author = [];
        var list3 = data.context || [];

        function show_l(list, data, e, key, name) {

            if ($(e)) {
                for (var i = 0; i < list.length; i++) {
                    data.push({
                        id: list[i].id,
                        name: list[i].name,
                        username: list[i].username
                    })
                }
                var html1 = '<option value="0">\u6240\u6709' + name + '</option>';
                var html2 = '';
                for (var i = 0, l = data; i < l.length; i++) {
                    html2 = l[i].name;
                    html1 += '<option value="' + html2 + '">' + html2 + '</option>';
                }
                $(e).html(html1);
            }
        }
        show_l(list3, common.s_author, '#s_author', 2, '发稿人');
    },
    //获取选择列表
    getPullDownList: function() {
        ajax_news.getPullDownList(undefined, common.select_show);
    },
    //获取列表
    getAllAuthor: function() {
        ajax_news.getAllAuthor(undefined, common.author_show);
    },
    //初试元素绑定
    bind_element: function() {
        $('table').on('click', '.t_bidui', function() {
            common.click_bidui($(this));
        })
        $('.nav_user .hirt').on('click', function() {
            $('.pop_alert').toggleClass('hide');
        })
        // $('.nav_user .user').on('click', function() {
        //     $('.pop_exit').toggleClass('hide');
        // })
        $('.contain table').on('click', '.t_bianji', function(e) {
            common.change($(this));
        })
        $('.contain table').on('click', '.t_shenhe', function(e) {
            common.edit($(this));
        })
        $('.contain table').on('click', '.t_zhonshen', function(e) {
            common.last_edit($(this));
        })
        $('.contain table').on('click', '.t_yulan', function(e) {
            common.look($(this));
        })
        $('.contain table').on('click', '.t_chakan', function(e) {
            common.look_details($(this));
        })
        $('.contain table').on('click', '.t_daochu', function(e) {
            common.download($(this));
        })
        $('.contain table').on('click', '.type2', function(e) {
            common.look($(this));
        })
        $('.pop_look .close').on('click', function(e) {
            $('.pop_look').addClass('hide');
        })
        $('.pop_exit a').on('click', function() {
            ajax_news.logout(undefined, common.reload);
        })
    },
    //重新加载
    reload: function() {
        if (main.index) {
            history.back();
        }
        location.reload();
    },
    //下载文档
    download: function($this) {
        var $tr = $this.closest('tr');
        var id = $tr.attr('tr_id');
        location.href = '' + '/v1/p/news/derived?newsId=' + id;
    },
    //预览文档
    look: function($this) {
        $('.pop_look').removeClass('hide');
        var $tr = $this.closest('tr');
        var id = $tr.attr('tr_id');
        common.data.ajax2.uid = common.k;
        common.data.ajax2.newsId = id;
        ajax_news.info(common.data.ajax2, common.text_show);
    },
    //查看文档
    look_details: function($this) {
        var $tr = $this.closest('tr');
        var id = $tr.attr('tr_id');
        location.href = '' + '/page/p/news/checkNewsDetail?id=' + id+'&storeType='+common.data.storeType;

    },
    //查看文档显示
    text_show: function(res) {
        console.log(res.context);
        var newsMedia = res.context.newsMedia || [];
        console.log(newsMedia);
        var imgs = [];
        var videos = [];
        for (var i = 0; i < newsMedia.length; i++) {
            if (newsMedia[i].type == 1) {
                imgs.push(newsMedia[i]);
            } else if (newsMedia[i].type == 3) {
                imgs.push(newsMedia[i]);
            } else {
                continue;
            }
        };
        var html1 = ``;
        if (imgs) {
            for (var i = 0; i < imgs.length; i++) {
                html1 += `<img src="${imgs[i].url}" alt="placeholder+image">`;
            }
        }
        var html2 = ``;
        if (videos) {
            for (var i = 0; i < videos.length; i++) {
                html2 += `<video src="${videos[i].url}" controls="true"></video>`;
            }
        }
        var html3 = `            <div class="list list7">
                <div class="left">附件图片 :</div>
                <div class="right">
                ${html1}
                </div>
                <div class="clear"></div>
            </div>`;
        var html4 = `            <div class="list list8">
                <div class="left">视频 :</div>
                <div class="right">
                ${html2}
                </div>
                <div class="clear"></div>
            </div>`;
        var html5 = res.context.news.title;

        var html6 = `
                    <div class="list list1">
                <div class="left">来源 :</div>
                <div class="right">${res.context.news.source}</div>
                <div class="clear"></div>
            </div>`;

        var html7 = `
                    <div class="list list2">
                <div class="left">作者 :</div>
                <div class="right">${res.context.news.author}</div>
                <div class="clear"></div>
            </div>`;
        var html8 = `
                    <div class="list list3">
                <div class="left">发稿人 :</div>
                <div class="right">${res.context.news.publishUser.username}</div>
                <div class="clear"></div>
            </div>`;
        var html9 = `
            <div class="list list4">
                <div class="left">关键词 :</div>
                <div class="right">${res.context.news.keyword} </div>
                <div class="clear"></div>
            </div>
            `;
        var html10 = `
            <div class="list list5">
                <div class="left">涉及领域 :</div>
                <div class="right">${res.context.news.field}</div>
                <div class="clear"></div>
            </div>
            `;
        var html11 = `
            <div class="list list6">
                <div class="left">内容 :</div>
                <div class="right">
                ${res.context.news.content}
                </div>
                <div class="clear"></div>
            </div>
        `;

        $('.pop_look .head h1').html(html5);
        var html12 = `
        ${html6} ${res.context.news.author?html7:''} ${html8} ${html9} ${html10} ${html11} ${imgs.length>0?html3:''} ${videos.length>0?html4:''} 
        `;
        $('.pop_look .content').html(html12);
    },
    //审辑文档
    change: function($this) {
        var $tr = $this.closest('tr');
        var id = $tr.attr('tr_id');

        location.href = '' + '/page/p/news/editNews?id=' + id+'&storeType='+common.data.storeType;
    },
    //审核文档
    edit: function($this) {
        var $tr = $this.closest('tr');
        var id = $tr.attr('tr_id');
        common.data.ajax4.uid = common.k;
        common.data.ajax4.newsId = id;
        ajax_news.lockNews(common.data.ajax4, undefined);
        location.href = '' + '/page/p/news/reviewNews?id=' + id+'&storeType='+common.data.storeType;

    },
    //终审文档
    last_edit: function($this) {
        var $tr = $this.closest('tr');
        var id = $tr.attr('tr_id');
        common.data.ajax4.uid = common.k;
        common.data.ajax4.newsId = id;
        ajax_news.lockNews(common.data.ajax4, undefined);
        location.href = '' + '/page/p/news/toFinal?id=' + id+'&storeType='+common.data.storeType;

    },
    //点击比对反应
    click_bidui: function($this) {
        var $tr = $this.closest('tr');
        var id = $tr.attr('tr_id');
        location.href = '' + '/page/p/news/compareNews?id=' + id;

    },
    //页面清除浮动
    clearfloat: function() {
        var html1 = '<div class=\'clear\'></div>';
        $('.contain').after(html1)
    },
    //分页器
    skip: function(ajax_fun, data, res, table_show) {
        var total = res.context.total;
        var start = data.start;
        var num = 20;
        var now = (start) / 20 + 1;
        var prev = now - 1;
        var next = now + 1;
        var min = 1;
        var max = Math.ceil(total / num);
        var html1 = '<div class="first_div"><span>\u5171' + total + '\u6761</span></div><div><span class="sum">\u6BCF\u987520\u6761</span></div><div class="prev_est"></div><div class="prev"></div><div class="page_num"><div class="num num1 ' + (prev < min && "hide") + '">' + prev + '</div><div class="num num2 active">' + now + '</div><div class="num num3 ' + (next > max && "hide") + '">' + next + '</div><div class="clear"></div></div><div class="last"></div><div class="last_est"></div><div><span class="intro">\u5F53\u524D' + now + '/' + max + '\u9875</span></div><div class="last_div"><span>\u8F6C\u5230\u7B2C<input type="text" name="" class="arrow">\u9875</span></div>';
        $('.m_skip').html(html1);
        $(".m_skip").off();
        $('.m_skip').on('click', 'div', function(e) {
            if ($(this).hasClass('prev_est')) {
                if (now > 1) { data.start = 0; } else { return }
            } else if ($(this).hasClass('prev')) {
                if (now > 1) { data.start = 20 * (now - 2); } else { return }
            } else if ($(this).hasClass('num')) {
                var k = Number($(this).text());
                data.start = 20 * (k - 1);
            } else if ($(this).hasClass('last')) {
                if (now < max) { data.start = 20 * (now); } else { return }
            } else if ($(this).hasClass('last_est')) {
                if (now < max) { data.start = 20 * (max - 1); } else { return }
            } else {
                return;
            }
            ajax_fun(data, table_show);
        })
        $('.m_skip .arrow').off();
        $('.m_skip .arrow').on('blur', function() {
            var v = $('.m_skip .arrow').val();
            var k = parseInt(v);
            if (k > 0 && k < max + 1) {
                data.start = 20 * (k - 1);
            } else {
                layer.msg('请输入正确数字!');
                var v = $('.m_skip .arrow').val('');
                return;
            }
            ajax_fun(data, table_show);
        });

    },
    //高度重置
    height_reset: function() {
        var height1 = ($(window).height() - 125) + 'px';
        $('.left_side').css({ "height": height1, 'box-sizing': 'border-box', 'overflow': 'hidden' });
        $('.left_side>ul').css({ "height": height1 });
        $('.contain').css({ "height": height1, "overflow": "auto" });
    },
    //用户信息展示
    user_show: function() {
        var username = $('.val2').text();
        var avatar = $('.val7').text();
        if (username) {
            $('.user').removeClass('hide')
            $('.user span').html(username);
        }
        if (avatar) {
            $('.people').removeClass('hide')
            //$('.people img').attr({ 'src': avatar });
        }
    }
}