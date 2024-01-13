//const xslxPath =

console.log(window.location.href);

const xslxPath = window.location.href.includes("github")
  ? "https://edcan-dev.github.io/planigrupo-edcan-dev/data/asg/actividades-final.xlsx"
  : "../../../data/asg/actividades-final.xlsx";

const response = await fetch(xslxPath);
const xlsx = await response.blob();

const activities = [];

class Activity {
  id;
  title;
  imageUrl;
  description;
  intro;
  category;
  dateString;
  year;
  location;
  specification;
  quantity;
}

class FeaturedActivity {
  description;
  image;
}

await readXlsxFile(xlsx, { sheet: 1 }).then(function (rows) {
  rows.shift();

  for (let index = 0; index < rows.length; index++) {
    const element = rows[index];
    //    console.log(element);

    const activity = new Activity();

    activity.id = index + 1;
    activity.category = element[0];
    activity.title = element[1];
    activity.location = element[2];
    activity.dateString = `${element[3]}-${element[4]}-${element[5]}`;
    activity.imageUrl = element[9];

    activity.specification = element[6];
    activity.quantity = element[7];

    activity.description = element[10];
    activity.intro = element[11];

    activity.year = element[5];

    activities.push(activity);
  }
  console.log("[READ XLSX SHEET 01]");
});

class ActivitiesReaderService {
  #activities = [];

  constructor(reader) {
    this.#activities = activities;
  }

  getActivities() {
    return this.#activities;
  }

  getActivitiesByCategory(category) {
    return this.#activities.filter((activity) => activity.category == category);
  }
  getActivityById(id) {
    return this.#activities.find((activity) => activity.id == id);
  }

  async getSocialFeaturedActivities() {
    const socialFeaturedActivities = [];

    await readXlsxFile(xlsx, { sheet: 3 }).then(function (rows) {
      rows.shift();

      for (let index = 0; index < rows.length; index++) {
        const element = rows[index];

        const featuredActivity = new FeaturedActivity();
        featuredActivity.description = element[0];
        featuredActivity.image = element[1];
        socialFeaturedActivities.push(featuredActivity);
      }
    });
    return new Promise((res, rej)=> {
      res(socialFeaturedActivities.reverse()),
      rej([])
    });
  }
  async getAmbientalFeaturedActivities() {
    const socialFeaturedActivities = [];

    await readXlsxFile(xlsx, { sheet: 2 }).then(function (rows) {
      rows.shift();

      for (let index = 0; index < rows.length; index++) {
        const element = rows[index];

        const featuredActivity = new FeaturedActivity();
        featuredActivity.description = element[0];
        featuredActivity.image = element[1];
        socialFeaturedActivities.push(featuredActivity);
      }
    });
    return new Promise((res, rej)=> {
      res(socialFeaturedActivities.reverse()),
      rej([])
    });
  }
}

export const activitiesReaderService = new ActivitiesReaderService();
