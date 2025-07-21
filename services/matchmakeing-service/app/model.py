from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def calculate_scores(user_vector, other_vectors):
    scores = cosine_similarity([user_vector], other_vectors)
    return scores[0].tolist()