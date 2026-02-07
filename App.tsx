import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, Text, ActivityIndicator, FlatList, View, StyleSheet, Button } from 'react-native';
import { fetchFeedData } from './services/api';
import { FeedItemType } from './types/Feed';
import FeedItem from './components/FeedItem';

export default function App() {
  const [data, setData] = useState<FeedItemType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load first page or retry
  const loadFeed = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const items = await fetchFeedData(1);
      setData(items);
      setPage(2);
    } catch (err: any) {
      setError('Failed to load feed. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  // Load more items for infinite scroll
  const loadMore = async () => {
    if (loadingMore || loading) return;

    try {
      setLoadingMore(true);
      const items = await fetchFeedData(page);
      setData(prev => [...prev, ...items]);
      setPage(prev => prev + 1);
      setError(null); 
    } catch (err: any) {
      setError('Failed to load more items. Pull down to retry.');
    } finally {
      setLoadingMore(false);
    }
  };

  // Pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const items = await fetchFeedData(1);
      setData(items);
      setPage(2);
      setError(null); 
    } catch (err: any) {
      setError('Failed to refresh. Check your connection and try again.');
    } finally {
      setRefreshing(false);
    }
  };

  // Initial loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  // Initial error state (no data loaded yet)
  if (error && !data.length) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: 'red', marginBottom: 16 }}>{error}</Text>
        <Button title="Retry" onPress={loadFeed} />
      </SafeAreaView>
    );
  }

  // Empty state
  if (!data.length) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>No items available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.header}>Feed</Text>

      {error && (
        <View style={{ padding: 16, alignItems: 'center' }}>
          <Text style={{ color: 'red', marginBottom: 8 }}>{error}</Text>
          <Button title="Retry" onPress={() => loadFeed()} />
        </View>
      )}

      <FlatList
        data={data}
        renderItem={({ item }) => <FeedItem item={item} />}
        keyExtractor={item => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListFooterComponent={() =>
          loadingMore ? <ActivityIndicator style={{ margin: 16 }} /> : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
