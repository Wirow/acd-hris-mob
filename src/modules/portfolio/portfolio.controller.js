(function() {

    angular
        .module("acdn-hris.app")
        .controller("PortfolioCtrl", PortfolioCtrl);

    function PortfolioCtrl(
        $stateParams,
        $timeout,
        PortfolioService,
        $error
    ) {
        /* jshint validthis: true */
        var vm = this;

        vm.portfolioInfo = {};
        vm.loadingBar = false;
        vm.educationResult = "";
        vm.initPortfolio = initPortfolio;
        vm.deletePortfolioItem = deletePortfolioItem;

        initPortfolio();

        function initPortfolio() {

            if($stateParams.educ == true) {
                vm.educationResult = "success";
            } else if($stateParams.educ == false) {
                vm.educationResult = "failed";
            } else {
                vm.educationResult = '';
            }

            $timeout(function() {
                vm.educationResult = '';
            }, 3000);

            PortfolioService.getPortfolioInfo()
                .then(function(portfolioInfo) {
                    vm.portfolioInfo = portfolioInfo;
                    vm.loadingBar = true;
                })
                .then(PortfolioService.updatePortfolioInfo)
                .then(function() {
                    vm.loadingBar = false;
                })
                .catch(function(err) {
                    $error(err);
                });
            
        }
        
        function deletePortfolioItem(id) {
            PortfolioService.deletePortfolioInfo(id)
                .then(function() {
                    vm.loadingBar = true;
                })
                .then(PortfolioService.updatePortfolioInfo)
                .then(function() {
                    vm.loadingBar = false;
                })
                .catch(function(err) {
                    $error(err);
                });
        }

    }

})();
