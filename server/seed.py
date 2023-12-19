#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from models import db, Workout, User

if __name__ == '__main__':
    # fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        Workout.query.delete()

        workouts = []

        workouts.append(Workout(image="https://steelsupplements.com/cdn/shop/articles/shutterstock_193409486_1000x.jpg?v=1639396039", workout_name ="Barbell Bench Press", workout_details= 'The Bench Press is one of the most popular and most effective compound movements for the chest.', workout_difficulty='beginner', workout_type= 'powerlifting', workout_category= 'chest', workout_likes=0))
        workouts.append(Workout(image="https://steelsupplements.com/cdn/shop/articles/shutterstock_623720516_1000x.jpg?v=1636559490", workout_name = "Barbell Back Squat", workout_details= 'The Barbell Back Squat is one of the most popular and most effective compound movements for the quads', workout_difficulty='intermediate', workout_type='powerlifting', workout_category='legs', workout_likes=0))
        workouts.append(Workout(image='https://steelsupplements.com/cdn/shop/articles/shutterstock_422996140_7e397ea1-38b2-4af0-acbf-e9fdc027279c_1000x.jpg?v=1630167451', workout_name = "Deadlift", workout_details='The Deadlift is a classic amongst lifters, this compound movement is extremely popular and is effective at target the lower back and glutes', workout_difficulty="beginner", workout_type="powerlifting", workout_category="back", workout_likes=0))

        db.session.add_all(workouts)
        db.session.commit()
