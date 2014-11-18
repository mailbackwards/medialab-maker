var splashView; // HACK: needs to be global so template can access country data

(function($){

var SplashView = Backbone.View.extend({

    events: {
      "click #generator":    "makeFakeName",
    },
    
    initialize: function(){
        this.loadNameData();
        this.render();
    },

    loadNameData: function(){
        var that = this;
        jQuery.getJSON("data/names.json", function(data){
            that.namesToPath = data;
        });
    },

    getRandomWord: function(words){
        return words[Math.floor(Math.random() * words.length)];
    },

    makeFakeName: function(){
        var names = this.namesToPath;
        var name = this.getRandomWord(names['first']) + " " + this.getRandomWord(names['second']);
        var descrip = this.getRandomWord(names['descrips-first']) + " " + 
                      this.getRandomWord(names['descrips-second']) + " " + 
                      this.getRandomWord(names['descrips-third']) + " " + 
                      this.getRandomWord(names['descrips-fourth']);
        $('#lab-group-name').text(name);
        $('#lab-group-description').text(descrip);
    },
     
    // render the whole app
    render: function(){
        $(this.el).load("templates/app.template");
    },
    
});

splashView = new SplashView;

// kick off the app!
$("#app").html(splashView.el);

})(jQuery);
