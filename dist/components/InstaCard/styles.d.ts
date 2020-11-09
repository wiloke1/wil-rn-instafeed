import { COLORS } from "../../utils/constants";
declare const styles: {
    container: {
        marginBottom: number;
        backgroundColor: string;
    };
    image: {
        backgroundColor: string;
    };
    avatar: {
        width: number;
        height: number;
        borderRadius: number;
        marginRight: number;
    };
    body: {
        padding: number;
    };
    icon: {
        width: number;
        height: number;
        marginRight: number;
        tintColor: COLORS;
    };
    buttonTextFollow: {
        fontSize: number;
        color: string;
    };
    buttonTextShare: {
        fontSize: number;
        color: COLORS;
    };
    actions: {
        flexDirection: "row";
        justifyContent: "space-between";
        alignItems: "center";
        marginTop: number;
    };
    actionsLeft: {
        flexDirection: "row";
        alignItems: "center";
        width: string;
    };
    actionsRight: {
        flexDirection: "row";
        alignItems: "center";
        justifyContent: "flex-end";
        width: string;
    };
    header: {
        flexDirection: "row";
        alignItems: "center";
    };
    buttonFollow: {
        marginLeft: number;
    };
    authorName: {
        color: COLORS;
        fontSize: number;
        fontWeight: "600";
    };
    authorLink: {
        color: COLORS;
        fontSize: number;
    };
    content: {
        marginTop: number;
    };
    date: {
        fontSize: number;
        textTransform: "uppercase";
        color: COLORS;
        letterSpacing: number;
        marginTop: number;
    };
    iconText: {
        flexDirection: "row";
        alignItems: "center";
        marginRight: number;
    };
    iconLike: {
        width: number;
        height: number;
        marginRight: number;
        tintColor: COLORS;
    };
    iconComment: {
        width: number;
        height: number;
        marginRight: number;
        tintColor: COLORS;
    };
    actionsLeftText: {
        fontSize: number;
    };
};
export default styles;
