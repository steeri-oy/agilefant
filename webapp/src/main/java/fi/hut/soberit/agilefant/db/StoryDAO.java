package fi.hut.soberit.agilefant.db;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.joda.time.Interval;

import fi.hut.soberit.agilefant.model.Backlog;
import fi.hut.soberit.agilefant.model.Iteration;
import fi.hut.soberit.agilefant.model.Story;
import fi.hut.soberit.agilefant.model.User;
import fi.hut.soberit.agilefant.util.StoryMetrics;

public interface StoryDAO extends GenericDAO<Story> {

    StoryMetrics calculateMetrics(int storyId);

    public int getStoryPointSumByIteration(int iterationId);
    public int getStoryValueSumByIteration(int iterationId);
    public int getCompletedStoryValueSumByIteration(int iterationId);

    public Map<Integer, Integer> getNumOfResponsiblesByStory(Set<Integer> storyIds);
    
    public Collection<Story> getAllIterationStoriesByResponsibleAndInterval(User user, Interval interval);

    public List<Story> retrieveStoriesInIteration(Iteration iteration);

    public List<Story> retrieveStoriesInBacklog(Backlog backlog);
    
    List<Story> retrieveActiveIterationStoriesWithUserResponsible(int userId);
    
    public List<Story> searchByName(String name);
    
    public List<Story> searchByID(String id);

}
