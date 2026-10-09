

class Error(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)
    def __str__(self):
        return self.message
    



class EntityCreationError(Error):
    def __init__(self, message ="UNABLE TO CREATE ENTITY"):
        super().__init__(message)

class EntityFetchingError(Error):
    def __init__(self, message ="UNABLE TO FETCH ENTITY"):
        super().__init__(message)





class UserNotFoundError(Error):
    def __init__(self, message ="USER NOT FOUND"):
        super().__init__(message)
        
class IncorrectPasswordError(Error):
    def __init__(self, message ="INCORRECT PASSWORD"):
        super().__init__(message)
        
class UserAlreadyExistsError(Error):
    def __init__(self, message ="USER ALREADY EXISTS"):
        super().__init__(message)
    
    
    
class AccessTokenError(Error):
    def __init__(self, message ="INVALID ACCESS TOKEN"):
        super().__init__(message)
        
class RefreshTokenError(Error):
    def __init__(self, message ="INVALID REFRESH TOKEN"):
        super().__init__(message)
