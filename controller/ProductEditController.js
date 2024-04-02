window.ProductEditController = function (
  $scope,
  $http,
  $routeParams,
  $location
) {
  var apiUrl = "http://localhost:3000/products";
  var editId = $routeParams.id;

  $scope.getProductInfo = function () {
    $http
      .get(`${apiUrl}/${editId}`)
      .then(function (response) {
        if (response.status == 200) {
          $scope.product = response.data;
          $scope.inputValidate = {
            name: response.data.name,
            price: response.data.price,
          }
        }
      })
      .catch(function (error) {
        $scope.messenge = `${(error, statusText)} product with id ${editId}`;
      });
  };
  $scope.getProductInfo();
  $scope.onEditForm = function () {
    //gán 1 biến để kiểm tra lỗi
    //nếu 1 trong 2 trường lỗi nó sẽ chuyển thành true
    let flag = false;
    if (!$scope.inputValidate || !$scope.inputValidate.name) {
      //nếu ko có inputValidate hoặc ko có inputValidate.name
      $scope.kiemTraDuLieu.name = true;
      flag = true;
    }
    if (!$scope.inputValidate || !$scope.inputValidate.price) {
      //nếu ko có inputValidate hoặc ko có inputValidate.price
      $scope.kiemTraDuLieu.price = true;
      flag = true;
    }
    if (!flag) {
      //tạo ra đối tượng item để sửa
      var updateItem = {
        ...$scope.inputValidate,
      };
      //khi thêm dữ liệu mới thì phải sử dụng phương thức post
      $http
        .put(
          `${apiUrl}/${editId}`,
          updateItem //dữ liệu để sửa
        )
        .then(function (response) {
          if (response.status == 200) {
            $location.path("/product/list");
          }
        });
    }
  };
};