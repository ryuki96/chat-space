json.array! @newmessages do |message|
  
  json.(message, :content)
  json.image        message.image.url
  json.date         message.created_at
  json.user_name    message.user.name
  json.id           message.id
end
