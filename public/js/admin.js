$(function() {
    $('.del').click(function(e) {
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id-' + id);
        $.ajax({
                type: 'DELETE',
                url: '/admin/movie/list?id=' + id
            })
            .done(function(results) {
                if (results.success === 1) {
                    if (tr.length > 0) {
                        tr.remove();
                    }
                }
            })
    });
    $("#douban").blur(function() {
        var douban = $(this);
        var id = douban.val();
        if (id) {
            $.ajax({
                url: 'https:/api.douban.com/v2/movie/subject/' + id,
                cache: true,
                type: 'get',
                dataType: 'jsonp',
                crossDomain: true,
                jsonp: 'callback',
                success: function(data) {
                    console.log(data);
                    $('#inputTitle').val(data.title)
                    $('#inputDirector').val(data.directors.map(function(item, i) {
                        return item.name
                    }).join('/'))
                    $('#inputCountry').val(data.countries.join('/'))
                        // $('#inputLanguage').val(data.languages.join('/'))
                    $('#inputPoster').val(data.images.large)
                    $('#inputYear').val(data.year)
                    $('#inputSummary').val(data.summary)
                }

            })
        }
    })

})