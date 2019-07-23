class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id]) 
    @newmessages = @group.messages.includes(:user).where("id > ?", params[:id]) #params[:id]というのは普通のidなのか区別がつかないので別の名前に変える　例：params[:last_id]
    respond_to do |format|
      format.json
      format.html
    end
  end
end