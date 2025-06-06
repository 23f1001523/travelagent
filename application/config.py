import os

basedir=os.path.abspath(os.path.dirname(__file__))

class LocalDevelopmentConfig:
    SECRET_KEY="secret"
    SQLALCHEMY_DATABASE_URI="sqlite:///database.db"
    SECURITY_PASSWORD_SALT="salty-password"
    DEBUG=True
    SQLALCHEMY_TRACK_MODIFICATIONS=False
    # UPLOAD_FOLDER=os.path.join(basedir,'../uploads/')
    UPLOAD_FOLDER=os.path.join(basedir,'../uploads/')
    
    CACHE_DEFAULT_TIMEOUT = 300
    CACHE_TYPE = "RedisCache"
    CACHE_REDIS_PORT = 6379
    # CACHE_REDIS_DB=2
    
    WTF_CSRF_CHECK_DEFAULT =False
    SECURITY_CSRF_PROTECT_MECHANISM= []
    SECURITY_CSRF_IGNORE_UNAUTH_ENDPOINTS= True
    
    # Flask-Security base settings
    SECURITY_TOKEN_AUTHENTICATION = True
    SECURITY_TOKEN_AUTHENTICATION_HEADER = 'Authentication-Token'
    SECURITY_API_ENABLED=True
   