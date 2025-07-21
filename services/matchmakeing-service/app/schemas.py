from pydantic import BaseModel
from typing import List

class UserVector(BaseModel):
    vector: List[float]

    class MatchRequest(BaseModel):
        user_vector: List[float]
        other_vectors: List[List[float]]

        
