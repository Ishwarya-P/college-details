$(document).ready(function(){

$('.delete-colg').on('click',function(){

var id=$(this).data('id');
var url='/DELETE/'+id;

if(confirm('Do you want to delete this college?')){

$.ajax({

    url:url,
    type:'DELETE',
    success:function(result){

        console.log('Deleting colg details');
        window.location.href='/';



    },
    error:function(err){
console.log(err);

    }

})

}


});


$('.edit-colg').on('click',function(){

    $('#form-id').val($(this).data('id'));
    $('#form-name').val($(this).data('name').trim());
    $('#form-location').val($(this).data('location'));
    $('#form-details').val($(this).data('details'));


});


});