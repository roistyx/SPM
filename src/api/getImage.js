import axios from 'axios';

export default class getImage {
  static async getHeroSectionBackgroundImage(htmlElement, opacity) {
    try {
      const response = await axios.get(
        `http://localhost:3200/background-image/${htmlElement}/${opacity}`
      );
      return response;
    } catch (error) {
      console.log('Error while calling getUserProfile API ', error);
    }
  }
}
