var Deck = cc.Node.extend({
    ctor: function() {
        this._super();
        this.remainingCard = 30;
        this.part = new Array(6);
        for( var i = 0; i < this.part.length; i++ ) {
            this.part[i] = cc.Sprite.create( 'res/images/card_0.jpg' );
            this.part[i].setPosition( new cc.Point( ( i * 5 ), ( i * 5 ) ) );
            this.addChild( this.part[i] );
        }
        this.amountLabel = cc.LabelTTF.create( this.remainingCard, 'ITC Stone Serif LT Italic', 30 );
        var pos = this.getPosition();
        this.amountLabel.setPosition( new cc.Point( pos.x + 10, pos.y + 40 ) );
        this.addChild( this.amountLabel );
    },
    update: function( dt ) {
        for( var i = 0; i < this.part.length; i++ ) {
            if( this.part[i] !== undefined && this.remainingCard < ( 5 * i ) ) {
                this.removeChild( this.part[i] );
            }
        }
    },
    drawCard: function() {
        this.remainingCard--;
        this.amountLabel.setString( this.remainingCard );
    }
});
