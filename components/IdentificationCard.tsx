import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface IdentificationCardProps {
    personName?: string;
    personImage?: string;
    zodiac?: string;
    status?: string;
    loveLanguage?: string;
    logoImage?: string;
    backgroundColor?: string;
}

const IdentificationCard: React.FC<IdentificationCardProps> = ({
    personName = "KASHI",
    zodiac = "TAURUS",
    status = "TAKEN",
    loveLanguage = "QUALITY TIME",
    personImage = "https://s3-alpha-sig.figma.com/img/28bb/5768/8aec94a14427729d3c545b14d593716b?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Dg0aAE7beshD9YHBC3B2JKCQBA5HtlvZGevzdox9K12G4UPOu80rOmfmatsu5G7c3bvEZ3J~bXdAiGPNKXim-hRfuxAZfg7znH7xdUOYhD7JBoVlIagBsXlnt~GRveRgimfEhKgs1~m59I3KwJiQ36ky8uL6qagYleT5eR6gGg13MbZH8tv8zj02iYRM5AyB0Zq4GxzTrunWKQfFUgKK1y0ke44nrKCJ7Jxa7kV3pUnhCdT1vG9O~RszM2QlXZThFZ5UCr6DxFvKKubU~t5xwfX3QpJLOcY2pG2tHabeW-okWmkBrGdYRqKQRd3nUgrXtLPYyASlS9alkWDEycPjcA__", // Default image
    logoImage = "https://s3-alpha-sig.figma.com/img/4c57/fd34/4ca0fbd7107b791f7c41ee59488b25d6?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SPQpgyfBL7fQxfN1QGwhcU-CmrlzPWw6I-dHrloczXnfYRpRaaf-6d1J-zhnlm0JbHAkdIXdk5Ec05nl4Y9OoIg7X-bgStbsZgOfTA-mkbFywOH2kJgOlGhHJXMR5ew8ARlVfKjVtt2IOg-NnKkprfwA~1Apxo2~cSERjyCwkWXSnLfgKgSmoIyNp~HemRjRY7HHt1nQ8DtNV1aaT5~jQ8DtbBS7xQwGt4gCUx4eVlHb3EIRtJXpNW6wwvcELwAPFZJttN6TLcV6QQL8hSdgI2kJ1h~726o2vHeDFoWEesPw-O8rfyn-t~QpIPMUQgjVE-z4McQe38iDKFNq~8QhJA__",
    backgroundColor = "#FFFFFF",
}) => {

    const textColor = '#000000';

    return (
        <View style={[styles.card, { backgroundColor }]}>
            <View style={styles.cardContent}>
                {/* Left Column */}
                <View style={styles.leftColumn}>
                    {/* Photo */}
                    <View style={[styles.photoContainer, { borderColor: textColor }]}>
                        <Image
                            source={{ uri: personImage }}
                            style={styles.photo}
                            resizeMode="cover"
                        />
                    </View>

                    {/* Barcode */}
                    <View style={styles.barcodeContainer}>
                        <Image
                            source={require('../assets/images/Barcode.png')}
                            style={styles.barcodeImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                {/* Right Column */}
                <View style={styles.rightColumn}>
                    {/* Logo */}
                    <View style={styles.logoSection}>
                        <Image
                            source={{ uri: logoImage }}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Dashed Divider */}
                    <View style={[styles.divider, { borderColor: textColor }]} />

                    {/* Details Section */}
                    <View style={styles.detailsSection}>
                        <View style={styles.detailsRow}>
                            {/* Left Details Column */}
                            <View style={styles.detailsColumn}>
                                <View style={styles.detailItem}>
                                    <Text style={[styles.detailLabel, { color: 'gray' }]}>NAME</Text>
                                    <Text style={[styles.detailValue, { color: textColor }]} numberOfLines={1}>{personName.toUpperCase()}</Text>
                                </View>

                                <View style={styles.detailItem}>
                                    <Text style={[styles.detailLabel, { color: 'gray' }]}>STATUS</Text>
                                    <Text style={[styles.detailValue, { color: textColor }]} numberOfLines={1}>{status.toUpperCase()}</Text>
                                </View>
                            </View>

                            {/* Right Details Column */}
                            <View style={styles.detailsColumn}>
                                <View style={styles.detailItem}>
                                    <Text style={[styles.detailLabel, { color: 'gray' }]}>ZODIAC</Text>
                                    <Text style={[styles.detailValue, { color: textColor }]}>{zodiac.toUpperCase()}</Text>
                                </View>

                                <View style={styles.detailItem}>
                                    <Text style={[styles.detailLabel, { color: 'gray' }]}>LOVE LANGUAGE</Text>
                                    <Text style={[styles.detailValue, { color: textColor }]} numberOfLines={1}>{loveLanguage.toUpperCase()}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 179,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#000',
        overflow: 'hidden',
        shadowColor: '#ffb8c6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
    },
    leftColumn: {
        width: 103,
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginRight: 20,
    },
    rightColumn: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    photoContainer: {
        width: 103,
        height: 128,
        borderWidth: 2,
        borderColor: '#000',
        overflow: 'hidden',
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    barcodeContainer: {
        width: 103,
        height: 18,
        marginTop: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    barcodeImage: {
        width: '100%',
        height: '100%',
    },
    logoSection: {
        width: '100%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImage: {
        width: '100%',
        height: '100%',
        aspectRatio: 746 / 325,
    },
    divider: {
        height: 1,
        borderWidth: 1,
        borderStyle: 'dashed',
        marginVertical: 8,
    },
    detailsSection: {
        flex: 1,
        justifyContent: 'center',
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailsColumn: {
        flex: 1,
        justifyContent: 'space-between',
        marginRight: 5,
    },
    detailItem: {
        marginTop: 8,
    },
    detailLabel: {
        fontSize: 10,
        fontWeight: '500',
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '700',
    },
});

export default IdentificationCard; 