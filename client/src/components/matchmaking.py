from sklearn.metrics.pairwise import cosine_similarity
import numpy as numpy

def caluculate_underscore(user_vector, other_vectors):
    scores = cosine_simiarity([user_vector], other_vectors)
    return scores[0]