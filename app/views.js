var splashView; // HACK: needs to be global so template can access country data

(function($){

var SplashView = Backbone.View.extend({

    events: {
      "click #generator":    "makeFakeName",
      "click .ml-image":     "makeFakeName" 
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
        $('.ml-image').remove()
        var names = this.namesToPath;
        var name = this.getRandomWord(names['first']) + " " + this.getRandomWord(names['second']);
        var descrip = this.getRandomWord(names['descrips-first']) + " " + 
                      this.getRandomWord(names['descrips-second']) + " " + 
                      this.getRandomWord(names['descrips-third']) + " " + 
                      this.getRandomWord(names['descrips-fourth']);
        $('#lab-group-name').text(name);
        $('#lab-group-description').text(descrip);
        var firstImg = this.getRandomWord(this.namesToPath['img-names'])
        var secondImg = this.getRandomWord(this.namesToPath['img-names'])
        $('#lab-group-img-first').attr('src', 'img/' + firstImg + '.png')
        $('#lab-group-img-second').attr('src', 'img/' + secondImg + '.png')
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
