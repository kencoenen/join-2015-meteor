if (Talks.find({}).count() < 1) {
    Talks.insert({ title: 'Netflix', votes: 0});
    Talks.insert({ title: 'IoT', votes: 0});
    Talks.insert({ title: 'Polymer', votes: 0});
    Talks.insert({ title: 'Ionic', votes: 0});
    Talks.insert({ title: 'Meteor', votes: 0});
    Talks.insert({ title: 'WeatherGenie', votes: 0});
    Talks.insert({ title: 'App Performance Monitor', votes: 0});
    Talks.insert({ title: 'Dokku', votes: 0});
    Talks.insert({ title: 'Digital Media Integration', votes: 0});
    Talks.insert({ title: 'Dokker', votes: 0});
}