$(function () {
    //功能1 配置查询对象 q
    let q = {
        pagenum: 1,     //页码值
        pagesize: 2,    //每页显示多少个数字
        state: '',    //文章分类的 ID
        state: ''       //文章的状态
    }

    //各项配置区域
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage

    //函数集体调用区
    getList()
    getThis()


    //功能2 获取文章列表
    function getList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败!')
                }
                let htmlStr = template('tpl_cont', res)
                $('tbody').html(htmlStr)
                //注意: 分页是为列表服务(主要还是需要这个-- total --),故在这调用
                getFenYe(res.total)
            }
        })
    }

    //功能3 实现筛选功能
    //3.1 定义类别函数(获取文章分类并渲染)
    function getThis() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败!')
                }
                let htmlStr = template('tpl_list', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    //3.2 完成筛选
    $('#form_search').on('submit', function (e) {
        e.preventDefault()
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        getList()
    })

    //功能4 实现分页功能
    function getFenYe(total) {
        //设置配置对象
        laypage.render({
            elem: 'pageBox',    //要渲染的容器
            count: total,       //数据的总条数
            limit: q.pagesize,  //一页显示多少条数据
            curr: q.pagenum,    //设置默认选中的页码
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 4, 6, 8, 10],
            // jump 回调函数会拿到两个参数,其中,obj这个参数可以获取当前的所有配置对象
            // first 直接用于判断 jump 回调的方式 -- 方式1 触发 返回 undefined  方式2 触发 返回 true
            // jump 回调的两种触发方式: 1. 通过点击页码触发回调  -- 2. 调用getFenYe() 函数时会被触发
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    getList()
                }
            }
        })
    }

    //实现删除功能
    $('tbody').on('click', '.btn_remove', function () {
        let id = $(this).data('id')
        let len = $('.btn_remove').length
        layer.confirm('确认删除当前文章?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败!')
                    }
                    layer.msg('删除文章成功!')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    getList()
                }
            })
            layer.close(index);
        });
    })

})