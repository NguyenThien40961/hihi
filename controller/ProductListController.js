window.ProductListController = function($scope,$http,$location){
    //tao duong dan apiUrl de goi ra api
    var apiUrl ="http://localhost:3000/products";
    $scope.getData= function(){
        //goi de lay data
        $http.get(apiUrl).then(function(response){
            //neu nhu response tra ve thanh cong 
            if(response.status == 200){
                //tao ra 1 bien product de hung du lieu
                // tu phia json-server do ve
                $scope.products = response.data;
            }
        })
    }
    $scope.getData();

    // Xóa
    $scope.onDelete = function(deleteID){
        let confirm = window.confirm('ban cos muon xoas  ko');
        if(confirm){
            $http.delete(`${apiUrl}/${deleteID}`).then(
                function(response){
                    if(response.status == 200){
                        $scope.getData();
                    }
                }
            )
        }
    }
    $scope.onDetail = function(id){
        $location.path(`/product/detail/${id}`)
    }
    $scope.onEdit = function(id){
        $location.path(`/product/${id}/edit`)
    }

}