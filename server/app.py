#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api
from models import User, Workout, Comment, Favorite


class Users(Resource):
    def post(self):
        data = request.json
        user = User(username = data['username'], email = data['email'], password_hash = data['password'])
        db.session.add(user)
        db.session.commit()
        session['user_id'] = user.id
        return make_response({'user': user.to_dict()}, 201)
api.add_resource(Users, '/api/v1/users')

class Workouts(Resource):
    def get(self):
        workouts = [workout.to_dict() for workout in Workout.query.all()]
        return make_response(workouts , 200)

api.add_resource(Workouts, '/api/v1/workouts')

class WorkoutsById(Resource):
    def get(self,id):
        workout = Workout.query.get(id)
        if not workout:
            return make_response({'error': 'Workout not found'}, 404)
        return make_response(workout.to_dict(), 200)

api.add_resource(WorkoutsById, '/api/v1/workouts/<int:id>')

class Comments(Resource):
    def get(self):
        comments = [comment.to_dict() for comment in Comment.query.all()]
        return make_response(comments, 200)
    def post(self):
        params = request.json
        new_comment = Comment(comment= params['comment'], username= params['username'], workout_id=params['workout_id'], user_id=params['user_id'])
        if params.get("parentId"):
            new_comment.parentId= params['parentId']
        db.session.add(new_comment)
        db.session.commit()
        return make_response(new_comment.to_dict(), 201)

api.add_resource(Comments, '/api/v1/comments')

class CommentsById(Resource):
    def delete(self,id):
        comment = Comment.query.get(id)
        if not comment:
            return make_response({'error':'comment not found'}, 404)
        db.session.delete(comment)
        db.session.commit()
        return make_response('deleted comment successfully', 204)
    def patch(self, id):
        comment = Comment.query.get(id)
        params = request.json
        for attr in params:
            setattr(comment,attr, params[attr] )
        db.session.commit()
        return make_response(comment.to_dict(), 200)
api.add_resource(CommentsById, '/api/v1/comments/<int:id>')

class Favorites(Resource):
    def get(self):
        favorites = [favorite.to_dict() for favorite in Favorite.query.all()]
        return make_response(favorites, 200)
api.add_resource(Favorites, '/api/v1/favorites')



@app.route('/api/v1/authorized')
def authorized():
    try:
        user = User.query.filter_by(id = session.get('user_id')).first()
        return make_response(user.to_dict(), 200)
    except:
        return make_response({"error" : "User not found"}, 404)
@app.route('/api/v1/logout', methods=['DELETE'])
def logout():
    session['user_id'] = None 
    return make_response('', 204)

@app.route('/api/v1/login', methods = ['POST'])
def login():
    data = request.json
    try:
        user = User.query.filter_by(username=data['username']).first()
        if user.authenticate(data['password']):
            session['user_id'] = user.id
            return make_response({'user': user.to_dict()}, 200)
        else:
            return make_response({'error': 'incorrect password'}, 401)
    except:
        return make_response({'error': 'username does not exist'}, 401)
@app.before_request
def check_logged_id():
    if request.endpoint in ['workouts', 'comments', 'favorites'] and not session.get('user_id'):
        return make_response({'error': 'Unauthorized. Please login'}, 401)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

