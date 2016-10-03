(function() {

    angular
        .module("acdn-hris.app")
        .controller("PortfolioCtrl", PortfolioCtrl);

    function PortfolioCtrl(
        $scope,
        $ionicModal,
        $timeout,
        PortfolioService,
        Moment

    ) {
        /* jshint validthis: true */
        var vm = this;
        var modalInstance = null;
        var modalTemplates =  {
            education: "templates/portfolio/education.modal.template.html",
            experience: "templates/portfolio/experience.modal.template.html"
        };

        vm.showModal = showModal;
        vm.hideModal = hideModal;
        vm.saveModalData = saveModalData;
        vm.alertForm = false;
        vm.itemsEducation = PortfolioService.getAllEducations();
        vm.newItem = {
            currentIndex: null,
            education: {},
            experience: {}
        };
        vm.dateFrom = {
            date: new Date(),
            callback: function(value){
                vm.newItem.education.dateFrom = value;
            }
        };
        vm.dateTo = {
            date: new Date(),
            callback: function(value){
                vm.newItem.education.dateTo = value;
            }
        };

        function showModal(label) {
            $ionicModal.fromTemplateUrl(modalTemplates[label], {
                animation: 'slide-in-up',
                scope: $scope
            }).then(function(modal) {
                modal.show();
                modalInstance = modal;
            });
        }

        function cleanModal() {
            vm.newItem.education = {};
            vm.newExperience = {};
        }

        function hideModal() {
            modalInstance.hide();
            modalInstance = null;
        }

        function saveModalData(label) {
            var result = null;
            if($scope.portfolio.modalForm.$valid && vm.newItem.education.dateFrom && vm.newItem.education.dateTo) {
                result = {};
                if(label == "education") {
                    result.org = vm.newItem.education.org;
                    result.course = vm.newItem.education.course;
                    result.dateFrom = Moment(vm.newItem.education.dateFrom).format("MMMM YYYY");
                    result.dateTo = Moment(vm.newItem.education.dateTo).format("MMMM YYYY");
                    PortfolioService.addNewItem(label, result);

                }
                result = null;
                cleanModal();
                hideModal();
            }
            vm.alertForm = true;
            $timeout(function() {
                vm.alertForm = false;
            }, 3000);
        }
    }

})();
