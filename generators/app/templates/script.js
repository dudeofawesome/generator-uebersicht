module.exports = {
    command: '',

    refreshFrequency: false,

    realRefreshFrequency: 120000,

    dataLoaded: false,

    afterRender: function () {
        $('#{{widgetName}}-widget-index-js').css('top', '550px');
        $('#{{widgetName}}-widget-index-js').css('left', '10px');
        $('#{{widgetName}}-widget-index-js').css('width', '500px');
        $('#{{widgetName}}-widget-index-js').css('color', 'white');

        var uber = this;

        var ready = function () {
            uber.run(uber.command, function () {});
            uber.refresh();
            setInterval(function () {
                uber.run(uber.command, function () {});
                uber.refresh();
            }, uber.realRefreshFrequency);
        };

        uber.command = uber.makeCommand(Date.now());
        ready();
    },

    makeCommand: function (epochMS) {
        return 'echo ' + epochMS;
    },

    update: function (output) {
        $('#epoch-time').text(output);

        if (!this.dataLoaded) {
            $('.{{widgetName}}-widget').removeClass('loading');
            this.dataLoaded = true;
        }
    }
};
