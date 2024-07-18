
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
# individual playing cards with a relationship to players.
class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rank = db.Column(db.String(10), nullable=False)
    suit = db.Column(db.String(10), nullable=False)
    player_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=True)

        
#game players with attributes like name, email, and a collection of cards they hold.
class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100),  nullable=False)
    password = db.Column(db.String(100), nullable=False)
    cards = db.relationship('Card', backref='player', lazy=True)

#game instance with attributes managing the game's state, including the deck, 
# table card, and player/computer participants
class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    deck = db.Column(db.PickleType, nullable=False)
    table_card = db.Column(db.PickleType, nullable=False)
    player_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)
    computer_id = db.Column(db.Integer, db.ForeignKey('player.id'), nullable=False)

    ##