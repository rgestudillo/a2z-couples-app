import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface IdentificationCardProps {
    personName?: string;
    personImage?: string;
    birthday?: string;
    school?: string;
    yearLevel?: string;
    logoImage?: string;
}

const IdentificationCard: React.FC<IdentificationCardProps> = ({
    personName = "JISOO",
    birthday = "03-01-1995",
    school = "UP-CEBU",
    yearLevel = "2ND YEAR",
    personImage = "https://s3-alpha-sig.figma.com/img/28bb/5768/8aec94a14427729d3c545b14d593716b?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Dg0aAE7beshD9YHBC3B2JKCQBA5HtlvZGevzdox9K12G4UPOu80rOmfmatsu5G7c3bvEZ3J~bXdAiGPNKXim-hRfuxAZfg7znH7xdUOYhD7JBoVlIagBsXlnt~GRveRgimfEhKgs1~m59I3KwJiQ36ky8uL6qagYleT5eR6gGg13MbZH8tv8zj02iYRM5AyB0Zq4GxzTrunWKQfFUgKK1y0ke44nrKCJ7Jxa7kV3pUnhCdT1vG9O~RszM2QlXZThFZ5UCr6DxFvKKubU~t5xwfX3QpJLOcY2pG2tHabeW-okWmkBrGdYRqKQRd3nUgrXtLPYyASlS9alkWDEycPjcA__", // Default image
    logoImage = "https://s3-alpha-sig.figma.com/img/4c57/fd34/4ca0fbd7107b791f7c41ee59488b25d6?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SPQpgyfBL7fQxfN1QGwhcU-CmrlzPWw6I-dHrloczXnfYRpRaaf-6d1J-zhnlm0JbHAkdIXdk5Ec05nl4Y9OoIg7X-bgStbsZgOfTA-mkbFywOH2kJgOlGhHJXMR5ew8ARlVfKjVtt2IOg-NnKkprfwA~1Apxo2~cSERjyCwkWXSnLfgKgSmoIyNp~HemRjRY7HHt1nQ8DtNV1aaT5~jQ8DtbBS7xQwGt4gCUx4eVlHb3EIRtJXpNW6wwvcELwAPFZJttN6TLcV6QQL8hSdgI2kJ1h~726o2vHeDFoWEesPw-O8rfyn-t~QpIPMUQgjVE-z4McQe38iDKFNq~8QhJA__",
}) => {


    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {/* Photo Section */}
                <View style={styles.photoSection}>
                    <Image
                        source={{ uri: personImage }}
                        style={styles.photo}
                        resizeMode="cover"
                    />
                </View>

                {/* Barcode Section */}
                <View style={styles.barcodeSection}>
                    <Image
                        source={require('../assets/images/Barcode.png')}
                        style={styles.barcodeImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Logo Section */}
                <View style={styles.logoSection}>
                    <Image
                        source={{ uri: logoImage }}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Details Section */}
                <View style={styles.detailsSection}>
                    <View style={styles.detailRow}>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>NAME</Text>
                            <Text style={styles.detailValue}>{personName}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>BIRTHDAY</Text>
                            <Text style={styles.detailValue}>{birthday}</Text>
                        </View>
                    </View>

                    <View style={styles.detailRow}>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>SCHOOL</Text>
                            <Text style={styles.detailValue}>{school}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>YEAR LEVEL</Text>
                            <Text style={styles.detailValue}>{yearLevel}</Text>
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
        height: 200,
        backgroundColor: 'white',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#000',
        overflow: 'hidden',
        shadowColor: '#ffb8c6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        position: 'relative',
    },
    cardContent: {
        flex: 1,
        padding: 15,
    },
    photoSection: {
        position: 'absolute',
        top: 16,
        left: 16,
        width: '35%',
        aspectRatio: 103 / 128,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 8,
        overflow: 'hidden',
        zIndex: 1,
    },
    photo: {
        width: '100%',
        height: '100%',
    },
    barcodeSection: {
        position: 'absolute',
        left: 15,
        bottom: 0,
        width: '35%',
        height: 40,
        justifyContent: 'center',
    },
    barcodeImage: {
        width: '100%',
        height: '100%',
    },
    barcode: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logoSection: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: '55%',
        alignItems: 'center',
    },
    logoImage: {
        width: '100%',
        height: 75,
        borderRadius: 12,
    },
    logoContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoInner: {
        backgroundColor: '#FF6B81',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 24,
        width: '100%',
        alignItems: 'center',
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    bigStar: {
        marginRight: -8,
    },
    smallStar: {
        marginTop: -8,
    },
    logoText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 1,
    },
    logoTextBig: {
        color: 'white',
        fontSize: 20,
        fontWeight: '800',
        letterSpacing: 1,
    },
    divider: {
        position: 'absolute',
        top: '55%',
        left: '45%',
        right: 16,
        height: 1,
        backgroundColor: '#000',
        marginVertical: 12,
    },
    detailsSection: {
        position: 'absolute',
        bottom: 0,
        right: 16,
        width: '55%',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    detailItem: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 10,
        color: '#777',
        fontWeight: '500',
    },
    detailValue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
    },
    cornerCircle: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FF9800',
        top: -12,
        right: 24,
    },
});

export default IdentificationCard; 