import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { SyntheticEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Card,
    Grid,
    Header,
    Tab,
    TabProps,
    Image,
} from "semantic-ui-react";
import { UserActivity } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

const panes = [
    { menuItem: "Future Events", pane: { key: "future" } },
    { menuItem: "Past Events", pane: { key: "past" } },
    { menuItem: "Hosting", pane: { key: "hosting" } },
];

export default observer(function ProfileActivities() {
    const { profileStore } = useStore();

    const { loadUserActivities, profile, loadingActivities, userActivities } =
        profileStore;

    useEffect(() => {
        loadUserActivities(profile!.username);
    }, [loadUserActivities, profile]);

    const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
        loadUserActivities(
            profile!.username,
            panes[data.activeindex as number].pane.key
        );
    };

    return (
        <Tab.Pane loading={loadingActivities}>
            <Grid>
                <Grid.Column width={16}>
                    <Header
                        floated="left"
                        icon="calender"
                        content={"Activities"}
                    />
                </Grid.Column>
                <Grid.Column>
                    <Tab
                        panes={panes}
                        menu={{ secondary: true, pointing: true }}
                        onTabeChange={(e: SyntheticEvent, data: TabProps) =>
                            handleTabChange(e, data)
                        }
                    />
                    <br />
                </Grid.Column>
                <Card.Group itemsPerRow={4}>
                    {userActivities.map((activity: UserActivity) => (
                        <Card
                            as={Link}
                            to={`/activities/${activity.id}`}
                            key={activity.id}
                        >
                            <Image
                                src={`/assets/categoryImages/${activity.category}.jpg`}
                                style={{ minHeight: 100, objectFit: "cover" }}
                            />
                            <Card.Content>
                                <Card.Header textAlign='center'>{activity.title}</Card.Header>
                                <Card.Meta textAlign='center'>
                                <div>{format(new Date(activity.date), 'do LLL')}</div>
                                <div>{format(new Date(activity.date), 'h: mm a')}</div>
                                </Card.Meta>
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
            </Grid>
        </Tab.Pane>
    );
});
