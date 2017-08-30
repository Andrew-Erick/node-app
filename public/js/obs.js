$(function(){
  var json=[{
    "id":1,
    "number":"0", 
    "name":"飞机型号IPT团队", 
    "level":"0", 
    "upper_obs":"NA"
  },{
    "id":2,
    "number":"1", 
    "name":"飞机型号PMO", 
    "level":1, 
    "upper_obs":"NA" 
  },{
    "id":3,
    "number":"3", 
    "name":"市场销售IPT团队",
    "level":1, 
    "upper_obs":0
  },{
    "id":4,
    "number":"2", 
    "name":"产品研发IPT团队", 
    "level":1, 
    "upper_obs":0
  },{
    "id":5,
    "number":"2.1", 
    "name":"总体设计IPT团队", 
    "level":2, 
    "upper_obs":2 
  },{
    "id":6,
    "number":"2.2", 
    "name":"航电系统IPT团队", 
    "level":2, 
    "upper_obs":2 
  },{
    "id":7,
    "number":"2.2.1", 
    "name":"指示记录系统IPT团队", 
    "level":3, 
    "upper_obs":2.2
  },{
    "id":8,
    "number":"2.2.2", 
    "name":"通信系统IPT团队", 
    "level":3, 
    "upper_obs":2.2
  },{
    "id":9,
    "number":"2.2.3", 
    "name":"导航系统IPT团队", 
    "level":3, 
    "upper_obs":2.2
  },{
    "id":10,
    "number":"2.3", 
    "name":"机械系统IPT团队", 
    "level":2, 
    "upper_obs":2
  },{
    "id":11,
    "number":"2.4", 
    "name":"结构设计IPT团队", 
    "level":2, 
    "upper_obs":2
  },{
    "id":12,
    "number":"4", 
    "name":"制造IPT团队", 
    "level":1, 
    "upper_obs":0
  }];
  var $table=$('#obsTable');
  var $remove=$('#obsRemove');
  var $toolbar=$('#obsToolbar');
  var $add=$('#obsAdd');
  var $form=$('#obsForm');
  var $modal=$('#obsModal');
  window.obsFormatter=function(value,row,index){
    return ['<span class="edit" title="edit" data-toggle="modal" data-target='+'#'+$modal.attr("id")+'>','<i class="oi oi-pencil"></i></span>','&nbsp;','<span class="remove" title="remove">','<i class="oi oi-trash"></i></span>'].join('');
  };
  window.upper_obsFormatter=function(value,row,index){
    return value==null?"":value.name;
  };
  initUpperObs();
  function initUpperObs(data){
    $.get("/obs/data").done(function(res){
      if(res!=null&&res.length>=0){
        var dom;
        if(data){
          res=res.filter(function(item,i){
            return item._id!=data;
          })
        }
        dom=res.map(function(item,i){
          return "<option value='"+item._id+"'>"+item.name+"</option>"
        }).join("");
        $("#obsModal").find("select[name=upper_obs]").html(dom);
      }
    })
  }
  window.obsActionEvents = {
    'click .edit': function (e, value, row, index) {
      e.preventDefault();
      initUpperObs(row._id)
      $form.attr({'data-add':'false','data-index':index});
      $form.find('[name]').each(function(i,item){
        var name=$(item).attr('name');
        if(name=="upper_obs"){
          if(row[name]!=undefined){
            $(item).val(row[name]._id);
          }
        }else{
          $(item).val(row[name]);
          
        }
      });
    },
    'click .remove': function (e, value, row, index) {
      e.preventDefault();
      deleteItem([row._id],function(){
        $table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        });     
      })
  }
  };
  $table.on('check.bs.table uncheck.bs.table ' +
        'check-all.bs.table uncheck-all.bs.table', function () {
    $remove.prop('disabled', !$table.bootstrapTable('getSelections').length);

    // save your data, here just save the current page
    // selections = getIdSelections();
    // push or splice the selections if you want to save all data selections
  });
  $remove.click(function(){
    var data=getIdSelections();
    if(data.ids.length>0){
      deleteItem(data.rowids,function(){
        $table.bootstrapTable('remove',{
          field:'_id',
          values:data.ids
        })
        $remove.prop('disabled',true);   
      })     
    }
  })
  function deleteItem(ids,next){
    $.ajax({
      type:"DELETE",
      url:"/obs/delete",
      data:{
        ids:ids
      },
      success:function(){
        next()
      }
    })
  }
 function getIdSelections() {
    var rowids=$.map($table.bootstrapTable('getSelections'), function (row) {
        return row._id
    });
    var ids=$.map($table.bootstrapTable('getSelections'), function (row) {
        return row._id
    });
    return {rowids:rowids,ids:ids};
  }
  $toolbar.find('select').change(function(){
    $table.bootstrapTable({
      exportDataType:$(this).val()
    })
  })
  // $table.bootstrapTable('load',json); 

  // func add & edit
  // add
  $add.click(function(){
    initUpperObs();
    $form.attr("data-add",true);
    $form.removeAttr("data-index"); 
  });

  $modal.on('hidden.bs.modal', function() {
    $form.formValidation('resetForm', true);
  });

  // form validate
  $form.formValidation({
    framework:'bootstrap',
    excluded:':disabled',
    icon:{
      valid:'glyphicon glyphicon-ok',
      invalid:'glyphicon glyphicon-remove',
      validating:'glyphicon glyphicon-refresh',
    },
    fields:{
      id:{
        validators:{
          notEmpty:{
            message:'the ID is required'
          },
          stringLength:{
            min:1,
            max:6,
            message:'The ID must be more than 1 and less than 6 characters long'
          },
          regexp:{
            regexp:/^[0-9]+$/,
            message:'The ID can only consist of number'
          }
        }
      },
      number:{},
      name:{},
      level:{},
      upper_obs:{},
      type:{}
    }
  }).on('success.form.fv',function(e){
      // Prevent form submission
      e.preventDefault();
      var $form=$(e.target);
      var data=$form.serializeObject();
      // 表单reset
      var add=$form.attr("data-add");
      var index=$form.attr("data-index");
       if(data._id==""||data._id==null){
        delete data._id;
      }
      $.post("/obs/edit",data).done(function(res){
        // var data=JSON.parse(data);
        if(res!=null){
          if(add=="true"){
            $table.bootstrapTable('insertRow',{index:1,row:res});
          }else{
            $table.bootstrapTable('updateRow',{index:index,row:res});       
          }
          $modal.modal('hide');
          $form.formValidation('resetForm', true);
        }
      })
    })

})