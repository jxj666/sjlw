'use strict';

//*********
// _________common

var common = {
    i: 0,
    theRequest: {},
    k: '',

    data: {
        edit_type: 0,
        storeType: 1,
        news_id: 0,
        user_id: 0,
        did_arr: [],
        did_obj: {
            'ZKS': '周刊社',
            'LWZK': '瞭望智库',
            'HQZZ': '环球杂志',
            'DFZK': '东方周刊',
            'CJGJZK': '财经国家周刊'
        },
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
        ajax5: {
            name: 'getUsers',
            roleId: 'CMS001'
        },
        ajax6: {
            name: 'getAllAuthor'
        },
        ajax7: {
            name: 'getUserDepartment',
            uid: 0,
        },
        ajax8: {
            name: 'changeDepartment',
            uid: 0,
            did: 0,
        }
    },
    //获取储存
    getCookie: function getCookie(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    },
    //设置储存
    setCookie: function setCookie(c_name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
    },
    //页面变量值获取
    val_reset: function val_reset() {
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
        $('#did').hide();
        common.data.did_arr = $('.val11').text().split(',');
        common.data.ajax7.uid = $('.val3').text();
        ajax_cms.getUserDepartment(common.data.ajax7, common.did_view);

    },
    //新闻部分管理
    new_role_control: function new_role_control() {
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
        if (common.role.val6) {}
        //总审2
        if (common.role.val7) {}
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
        if (common.role.val18) {}
        //研报总审2
        if (common.role.val19) {}
        if (common.role.val20) {}

    },
    //显示部门选择
    did_view: function(res, name) {
        var now_did = res.context.did;
        $('.val1').html(now_did);
        var did_arr = common.data.did_arr;
        var did_obj = common.data.did_obj;
        if (did_arr.length > 1) {
            var didHtml = '';
            for (var i = 0; i < did_arr.length; i++) {
                if (now_did == did_arr[i]) {

                    didHtml += '<option value="' + did_arr[i] + '" selected>' + did_obj[did_arr[i]] + '</option>';
                } else {
                    didHtml += '<option value="' + did_arr[i] + '">' + did_obj[did_arr[i]] + '</option>';
                }
            }
            $('#did').html(didHtml).show();
        }
    },
    //打印 ajax 回调
    console_data: function console_data(res, name) {
        common.i += 1;
        if (res.code != '1') {
            //console.log('运行排序:' + common.i, name + '接口错误! ->' + res.msg);
        } else {
            //console.log('运行排序:' + common.i, '接口:' + name, res);
        }
    },
    //处理单个 url 数据
    getQueryString: function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(?:&|$)", 'i');
        var str_arr = window.location.search.substr(1).match(reg);
        return str_arr != null ? str_arr[2] : null;
    },
    //处理全部 url 数据
    getParamObj: function getParamObj() {
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
    ajax: function ajax(url, method, data, explain, callback) {
        var port = explain;
        port = port + ' : ' + url;
        $.ajax({
            url: url,
            method: method,
            data: data
        }).done(function(res) {
            common.console_data(res, port);
            if (res.code != '1') {
                layer.msg(res.msg ? res.msg : port + ' 返回数据出错!');
                // layer.msg(port + ' 返回数据出错!');
            } else {
                callback && callback(res);
            }
        }).fail(function(jqXHR, textStatus) {
            //console.log(jqXHR, textStatus);
        });
    },
    //获取通知信息
    getTrumpet: function getTrumpet() {
        common.data.ajax1.uid = common.k;
        ajax_cms.getTrumpet(common.data.ajax1, common.message_show);
    },
    //通知信息展示
    message_show: function message_show(res) {
        var html1 = '<a href="javascript:void(0)"><li onclick="location.href=\'/page/p/news/auditWord.html\'">\u5F85\u5BA1\u6838<span>' + res.context.news + '</span></li></a><a href="javascript:void(0)"><li onclick="location.href=\'/page/p/topic/themeManage\'">\u9009\u9898</li></a><a href="javascript:void(0)"><li onclick="location.href=\'/page/p/message/message\'">\u6D88\u606F\u4E2D\u5FC3<span>' + res.context.unReadMsg + '</span></li></a>';
        $('.pop_alert ul').html(html1);
    },
    //选择信息展示
    select_show: function select_show(data) {
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
                    });
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
    author_show: function author_show(data) {
        common.s_author = [];
        var list3 = JSON.parse(data.context).rows || [];

        function show_l(list, data, e, key, name) {

            if ($(e)) {
                for (var i = 0; i < list.length; i++) {
                    data.push({
                        id: list[i].id,
                        name: list[i].name,
                        username: list[i].username
                    });
                }
                var html1 = '<option value="0">\u6240\u6709' + name + '</option>';
                var html2 = '';
                var html3 = '';
                for (var i = 0, l = data; i < l.length; i++) {
                    html2 = l[i].name;
                    html3 = l[i].id;
                    html1 += '<option value="' + html3 + '">' + html2 + '</option>';
                }
                $(e).html(html1);
            }
        }
        show_l(list3, common.s_author, '#s_author', 2, '发稿人');
    },
    //获取选择列表
    getPullDownList: function getPullDownList() {
        ajax_cms.getPullDownList(undefined, common.select_show);
    },
    //获取列表
    getAllAuthor: function getAllAuthor() {
        ajax_cms.getUsers(common.data.ajax5, common.author_show);
    },
    //初试元素绑定
    bind_element: function bind_element() {
        $('table').on('click', '.t_bidui', function() {
            common.click_bidui($(this));
        });
        $('.nav_user .hirt').on('click', function() {
            $('.pop_alert').toggleClass('hide');
        });
        // $('.nav_user .user').on('click', function() {
        //     $('.pop_exit').toggleClass('hide');
        // })
        $('.contain table').on('click', '.t_bianji', function(e) {
            common.change($(this));
        });
        $('.contain table').on('click', '.t_shenhe', function(e) {
            common.edit($(this));
        });
        $('.contain table').on('click', '.t_zhonshen', function(e) {
            common.last_edit($(this));
        });
        $('.contain table').on('click', '.t_yulan', function(e) {
            common.look($(this));
        });
        $('.contain table').on('click', '.t_chakan', function(e) {
            common.look_details($(this));
        });
        $('.contain table').on('click', '.t_daochu', function(e) {
            common.download($(this));
        });
        $('.contain table').on('click', '.type2', function(e) {
            common.look($(this));
        });
        $('.pop_look .close').on('click', function(e) {
            $('.pop_look').addClass('hide');
        });
        $('.pop_exit a').on('click', function() {
            ajax_cms.logout(undefined, common.reload);
        });
        $('#did').on('change', function() {
            common.data.ajax8.did = $(this).val();
            common.data.ajax8.uid = $('.val3').text();
            ajax_cms.changeDepartment(common.data.ajax8, common.to_index);
        })
    },
    //回首页
    to_index: function() {
        location.replace('/page/p/index/index');
    },
    //重新加载
    reload: function reload() {
        if (main.index) {
            history.back();
        }
        location.reload();
    },
    //下载文档
    download: function download($this) {
        var $tr = $this.closest('tr');
        var id = $tr.attr('tr_id');
        location.href = '' + '/v1/p/news/derived?newsId=' + id;
    },
    //预览文档
    look: function look($this) {
        $('.pop_look').removeClass('hide');
        var $tr = $this.closest('tr');
        var id = $tr.attr('tr_id');
        common.data.ajax2.uid = common.k;
        common.data.ajax2.newsId = id;
        ajax_cms.info(common.data.ajax2, common.text_show);
    },
    //查看文档
    look_details: function look_details($this) {
        var $tr = $this.closest('tr');
        var id = $tr.attr('tr_id');
        location.href = '' + '/page/p/news/checkNewsDetail?id=' + id + '&storeType=' + common.data.storeType;
    },
    //查看文档显示
    text_show: function text_show(res) {
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
        var html1 = '';
        if (imgs) {
            for (var i = 0; i < imgs.length; i++) {
                html1 += '<img src="' + imgs[i].url + '" alt="placeholder+image">';
            }
        }
        var html2 = '';
        if (videos) {
            for (var i = 0; i < videos.length; i++) {
                html2 += '<video src="' + videos[i].url + '" controls="true"></video>';
            }
        }
        var html3 = '            <div class="list list7">\n                <div class="left">\u9644\u4EF6\u56FE\u7247 :</div>\n                <div class="right">\n                ' + html1 + '\n                </div>\n                <div class="clear"></div>\n            </div>';
        var html4 = '            <div class="list list8">\n                <div class="left">\u89C6\u9891 :</div>\n                <div class="right">\n                ' + html2 + '\n                </div>\n                <div class="clear"></div>\n            </div>';
        var html5 = res.context.news.title;

        var html6 = '\n                    <div class="list list1">\n                <div class="left">\u6765\u6E90 :</div>\n                <div class="right">' + res.context.news.source + '</div>\n                <div class="clear"></div>\n            </div>';

        var html7 = '\n                    <div class="list list2">\n                <div class="left">\u4F5C\u8005 :</div>\n                <div class="right">' + res.context.news.author + '</div>\n                <div class="clear"></div>\n            </div>';
        var html8 = '\n                    <div class="list list3">\n                <div class="left">\u53D1\u7A3F\u4EBA :</div>\n                <div class="right">' + res.context.news.publishUser.username + '</div>\n                <div class="clear"></div>\n            </div>';
        var html9 = '\n            <div class="list list4">\n                <div class="left">\u5173\u952E\u8BCD :</div>\n                <div class="right">' + res.context.news.keyword + ' </div>\n                <div class="clear"></div>\n            </div>\n            ';
        var html10 = '\n            <div class="list list5">\n                <div class="left">\u6D89\u53CA\u9886\u57DF :</div>\n                <div class="right">' + res.context.news.field + '</div>\n                <div class="clear"></div>\n            </div>\n            ';
        var html11 = '\n            <div class="list list6">\n                <div class="left">\u5185\u5BB9 :</div>\n                <div class="right">\n                ' + res.context.news.content + '\n                </div>\n                <div class="clear"></div>\n            </div>\n        ';

        $('.pop_look .head h1').html(html5);
        var html12 = '\n        ' + html6 + ' ' + (res.context.news.author ? html7 : '') + ' ' + html8 + ' ' + html9 + ' ' + html10 + ' ' + html11 + ' ' + (imgs.length > 0 ? html3 : '') + ' ' + (videos.length > 0 ? html4 : '') + ' \n        ';
        $('.pop_look .content').html(html12);
    },
    //编辑文档
    change: function change($this) {
        var $tr = $this.closest('tr');
        var id = $tr.attr('tr_id');

        location.href = '' + '/page/p/news/editNews?id=' + id + '&storeType=' + common.data.storeType;
    },
    // 锁定校验
    lock_examine: function lock_examine(res) {
        localStorage.lock_examine = JSON.stringify(res);
        if (res.code == 1) {
            if (common.data.edit_type == 0) {
                location.href = '' + '/page/p/news/reviewNews?id=' + common.data.news_id + '&storeType=' + common.data.storeType;
            } else {
                location.href = '' + '/page/p/news/toFinal?id=' + common.data.news_id + '&storeType=' + common.data.storeType;
            }
        } else {
            layer.msg(res.msg);
        }
    },
    //审核文档
    edit: function edit($this) {
        var $tr = $this.closest('tr');
        var id = $tr.attr('tr_id');
        common.data.news_id = id;
        common.data.ajax4.uid = common.k;
        common.data.ajax4.newsId = id;
        common.data.edit_type = 0;
        ajax_cms.lockNews(common.data.ajax4, common.lock_examine);
    },
    //终审文档
    last_edit: function last_edit($this) {
        var $tr = $this.closest('tr');
        var id = $tr.attr('tr_id');
        common.data.news_id = id;
        common.data.ajax4.uid = common.k;
        common.data.ajax4.newsId = id;
        common.data.edit_type = 1;
        ajax_cms.lockNews(common.data.ajax4, common.lock_examine);
    },
    //点击比对反应
    click_bidui: function click_bidui($this) {
        var $tr = $this.closest('tr');
        var id = $tr.attr('tr_id');
        location.href = '' + '/page/p/news/compareNews?id=' + id;
    },
    //页面清除浮动
    clearfloat: function clearfloat() {
        var html1 = '<div class=\'clear\'></div>';
        $('.contain').after(html1);
    },
    //分页器
    skip: function skip(ajax_fun, data, res, table_show) {
        var total = res.context.total;
        var start = data.start;
        var num = 20;
        var now = start / 20 + 1;
        var prev = now - 1;
        var next = now + 1;
        var min = 1;
        var max = Math.ceil(total / num);
        var html1 = '<div class="first_div"><span>\u5171' + total + '\u6761</span></div><div><span class="sum">\u6BCF\u987520\u6761</span></div><div class="prev_est"></div><div class="prev"></div><div class="page_num"><div class="num num1 ' + (prev < min && "hide") + '">' + prev + '</div><div class="num num2 active">' + now + '</div><div class="num num3 ' + (next > max && "hide") + '">' + next + '</div><div class="clear"></div></div><div class="last"></div><div class="last_est"></div><div><span class="intro">\u5F53\u524D' + now + '/' + max + '\u9875</span></div><div class="last_div"><span>\u8F6C\u5230\u7B2C<input type="text" name="" class="arrow">\u9875</span></div>';
        $('.m_skip').html(html1);
        $(".m_skip").off();
        $('.m_skip').on('click', 'div', function(e) {
            if ($(this).hasClass('prev_est')) {
                if (now > 1) {
                    data.start = 0;
                } else {
                    return;
                }
            } else if ($(this).hasClass('prev')) {
                if (now > 1) {
                    data.start = 20 * (now - 2);
                } else {
                    return;
                }
            } else if ($(this).hasClass('num')) {
                var k = Number($(this).text());
                data.start = 20 * (k - 1);
            } else if ($(this).hasClass('last')) {
                if (now < max) {
                    data.start = 20 * now;
                } else {
                    return;
                }
            } else if ($(this).hasClass('last_est')) {
                if (now < max) {
                    data.start = 20 * (max - 1);
                } else {
                    return;
                }
            } else {
                return;
            }
            ajax_fun(data, table_show);
        });
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
    height_reset: function height_reset() {
        var height1 = $(window).height() - 125 + 'px';
        $('.left_side').css({ "height": height1, 'box-sizing': 'border-box', 'overflow': 'hidden' });
        $('.left_side>ul').css({ "height": height1 });
        $('.contain').css({ "height": height1, "overflow": "auto" });
    },
    //用户信息展示
    user_show: function user_show() {
        var username = $('.val2').text();
        var avatar = $('.val7').text();
        if (username) {
            $('.user').removeClass('hide');
            $('.user span').html(username);
        }
        if (avatar) {
            $('.people').removeClass('hide');
            //$('.people img').attr({ 'src': avatar });
        }
    }
};