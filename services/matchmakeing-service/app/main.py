from fastapi import FastAPI
from app.model import calculate_scores
from app.schemas import MatchRequest

app = FastAPI()

@app.post("/matchmaking")
def get_matches(data: MatchRequest):
    scores = calculate_scores(data.user_vector, data.other_vectors)
    return {"scores": scores}