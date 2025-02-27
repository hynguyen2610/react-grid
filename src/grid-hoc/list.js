import Circle from "./circle";

const fiveATags = [
    { href: "https://example.com/1", children: "Link 1" },
    { href: "https://example.com/2", children: "Link 2" },
    { href: "https://example.com/3", children: "Link 3" },
    { href: "https://example.com/4", children: "Link 4" },
    { href: "https://example.com/5", children: "Link 5" },
];

const fiveCircles = [
    { radius: "1" },
    { radius: "2" },
    { radius: "3", bgcolor: 'yellow' },
    { radius: "4" },
    { radius: "5" },
];

const withList = (Element) => (props) => {
    const { items } = props;
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>
                    <Element {...item} />
                </li>
            ))}
        </ul>
    );
};

const List = withList('a');
const CircleList = withList(Circle);

export const FiveLinks = () => <List items={fiveATags} />;
export const FiveCircles = () => <CircleList items={fiveCircles} />;

