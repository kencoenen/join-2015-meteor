if (Meteor.isClient) {
    // This code only runs on the client
    Template.body.helpers({
        talks: function () {
            return Talks.find({}, {sort: {votes: -1}});
        }
    });

    Template.talk.events({
        "click li": function () {
            if (Session.get('voted') == null) {
                Talks.update(this._id, {
                    $set: {votes: this.votes + 1}
                });
                Session.set('voted', true);
            } else {
                alert('Already voted!');
            }
        }
    });
}