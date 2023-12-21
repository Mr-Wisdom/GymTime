from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ('-_password_hash', '-comments',)

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())

    #Relationships
    favorites = db.relationship('Favorite', back_populates = 'user')
    comments = db.relationship('Comment', back_populates = 'user')
    
    workouts_user_favorited = association_proxy('favorites', 'workout')
    workouts_user_commented_on = association_proxy('comments', 'workout')

    
    @property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, plain_text_password):
        byte_object = plain_text_password.encode('utf-8')
        encrypted_password_object = bcrypt.generate_password_hash(byte_object)
        hashed_password_string = encrypted_password_object.decode('utf-8')
        self._password_hash = hashed_password_string
    
    def authenticate(self, password_string):
        byte_object = password_string.encode('utf-8')
        return bcrypt.check_password_hash(self.password_hash, byte_object)


class Workout(db.Model, SerializerMixin):
    __tablename__ = "workouts"

    serialize_rules = ('-comments',)

    id = db.Column(db.Integer, primary_key = True)
    image = db.Column(db.String)
    workout_name = db.Column(db.String)
    workout_details = db.Column(db.String)
    workout_difficulty = db.Column(db.String)
    workout_type = db.Column(db.String)
    workout_category = db.Column(db.String)
    workout_likes = db.Column(db.Integer)

    #Relationships
    favorites = db.relationship('Favorite', back_populates = 'workout')
    comments = db.relationship('Comment', back_populates = 'workout')

    users_that_favorited = association_proxy('favorites', 'user')
    users_that_commented = association_proxy('comments', 'user')


class Favorite(db.Model, SerializerMixin):
    __tablename__ = "favorites"

    #SerializeRules

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))

    #Relationships
    user = db.relationship('User', back_populates = 'favorites')
    workout = db.relationship('Workout', back_populates = 'favorites')




class Comment(db.Model, SerializerMixin):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key = True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    workout_id = db.Column(db.Integer, db.ForeignKey('workouts.id'))
    comment = db.Column(db.String)
    username = db.Column(db.String)
    parentId = db.Column(db.Integer, server_default = None)
    created_at = db.Column(db.DateTime, server_default = db.func.now())

    #Relationships
    user = db.relationship('User', back_populates = 'comments')
    workout = db.relationship('Workout', back_populates = 'comments')
