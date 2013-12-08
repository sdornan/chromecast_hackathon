require 'google_drive'
require 'nokogiri'
require 'open-uri'

class TictactoesController < ApplicationController
  def index
    session = GoogleDrive.login('sam.hackathon@gmail.com', '$omething123')

    # https://docs.google.com/presentation/d/1vslaVs_AZLFYmg4T-XONLutGJZaCvqBHe54V3gy-VRM/edit#slide=id.g25854022a_00
    # https://docs.google.com/presentation/d/1vslaVs_AZLFYmg4T-XONLutGJZaCvqBHe54V3gy-VRM/export/png?id=1vslaVs_AZLFYmg4T-XONLutGJZaCvqBHe54V3gy-VRM&pageid=g25854022a_00

    for file in session.files
      p file.document_feed_url
      doc = Nokogiri::HTML(open('https://docs.google.com/presentation/d/1vslaVs_AZLFYmg4T-XONLutGJZaCvqBHe54V3gy-VRM/edit#slide=id.p'))
      doc.xpath("//iframe[contains(@href,'export')]").each do |slide|
        p slide
      end
    end
  end
end
