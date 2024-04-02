window.ProductAddController = function ($scope, $http, $location) {
    var apiUrl = "http://localhost:3000/products";
    //kiểm tra dữ liệu có hợp lệ hay không
    $scope.kiemTraDuLieu = {
      name: false,
      price: false,
    }
  
    $scope.onSubmit = function(){
      //gán 1 biến để kiểm tra lỗi
      //nếu 1 trong 2 trường lỗi nó sẽ chuyển thành true
      let flag = false;
      if (!$scope.inputValidate || !$scope.inputValidate.name) {
          //nếu ko có inputValidate hoặc ko có inputValidate.name
          $scope.kiemTraDuLieu.name = true;
          flag = true;
      }
      if (!$scope.inputValidate || !$scope.inputValidate.price) {
          //nếu ko có inputValidate hoặc ko có inputValidate.name
          $scope.kiemTraDuLieu.price = true;
          flag = true;
      }
      if(!flag){
        //tao ra doi tuong item moi de them vao
        var newItem ={
            ...$scope.inputValidate,
        }
        // khi them du lieu moi tho phai su dung phuong thuc post
        $http.post(
            apiUrl,
            newItem // du lieu de them vao
        ).then(function(response){
            if(response.status == 201){
                $location.path('/product/list')
            }
        })
      }
    }
  };